// import { PrismaClient, Booking, User, MembershipPlan } from '@prisma/client'; // Unused
import { CreateBookingSchema } from '@smashpoint/shared';
import { z } from 'zod';

import prisma from '../db';

// Business Constants
const OPEN_HOUR = 6; // 6 AM
const CLOSE_HOUR = 23; // 11 PM
const SLOT_DURATION_MINUTES = 30;

const PEAK_HOURS = {
    WEEKDAY: { start: 17, end: 21 }, // 5 PM - 9 PM
    WEEKEND: { start: 8, end: 14 }   // 8 AM - 2 PM
};

const RATES = {
    PEAK: 60,
    OFF_PEAK: 40
};

export const bookingService = {
    /**
     * Find available slots for a given date
     */
    async findAvailableSlots(dateStr: string) {
        const date = new Date(dateStr);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        // Get all courts
        const courts = await prisma.court.findMany();

        // Get existing bookings for the day
        const bookings = await prisma.booking.findMany({
            where: {
                startTime: { gte: startOfDay },
                endTime: { lte: endOfDay },
                status: { not: 'CANCELLED' }
            }
        });

        // Generate all possible slots
        const slots: any[] = [];
        const current = new Date(startOfDay);
        current.setHours(OPEN_HOUR, 0, 0, 0);

        while (current.getHours() < CLOSE_HOUR) {
            const slotStart = new Date(current);
            const slotEnd = new Date(current.getTime() + SLOT_DURATION_MINUTES * 60000);

            const availableCourts = courts.filter(court => {
                // Check if court is booked during this slot
                const isBooked = bookings.some(b =>
                    b.courtId === court.id &&
                    ((b.startTime < slotEnd && b.endTime > slotStart)) // Overlap check
                );
                return !isBooked;
            });

            if (availableCourts.length > 0) {
                slots.push({
                    startTime: slotStart.toISOString(),
                    endTime: slotEnd.toISOString(),
                    availableCourtIds: availableCourts.map(c => c.id),
                    isPeak: this.isPeakTime(slotStart)
                });
            }

            // Increment
            current.setMinutes(current.getMinutes() + SLOT_DURATION_MINUTES);
        }

        return slots;
    },

    /**
     * Calculate price for a booking
     */
    async calculatePrice(userId: string, startTime: Date, endTime: Date) {
        // 1. Get User Membership
        const membership = await prisma.membership.findFirst({
            where: { userId, isActive: true, endDate: { gte: new Date() } },
            include: { plan: true }
        });

        const plan = membership?.plan;
        const discount = plan?.courtDiscountPercent || 0;

        // 2. Calculate Duration in Hours
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        // 3. Determine Base Rate (Peak vs Off-Peak)
        // Simplification: If start time is peak, entire slot is peak
        const isPeak = this.isPeakTime(startTime);
        const baseRate = isPeak ? RATES.PEAK : RATES.OFF_PEAK;

        // 4. Apply Discount
        const price = baseRate * durationHours * (1 - discount);

        return {
            totalPrice: Math.round(price * 100) / 100, // Round to 2 decimals
            baseRate,
            isPeak,
            appliedDiscount: discount
        };
    },

    /**
     * Validate booking rules
     */
    async validateBookingRules(userId: string, startTime: Date) {
        const membership = await prisma.membership.findFirst({
            where: { userId, isActive: true, endDate: { gte: new Date() } },
            include: { plan: true }
        });

        const plan = membership?.plan;

        // Rule 1: Booking Window
        // Default to 5 days (Bronze/Guest) if no plan
        const bookingWindowDays = plan?.bookingWindowDays || 5;

        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + bookingWindowDays);

        if (startTime > maxDate) {
            throw new Error(`Booking too far in advance. Your booking window is ${bookingWindowDays} days.`);
        }

        return true;
    },

    /**
     * Create a booking
     */
    async createBooking(userId: string, data: z.infer<typeof CreateBookingSchema>) {
        const startTime = new Date(data.startTime);
        const endTime = new Date(data.endTime);

        // 1. Validate Rules
        await this.validateBookingRules(userId, startTime);

        // 2. Check Availability (Double check)
        const conflict = await prisma.booking.findFirst({
            where: {
                courtId: data.courtId,
                status: { not: 'CANCELLED' },
                OR: [
                    { startTime: { lt: endTime, gt: startTime } },
                    { endTime: { gt: startTime, lt: endTime } },
                    { startTime: { lte: startTime }, endTime: { gte: endTime } }
                ]
            }
        });

        if (conflict) {
            throw new Error('Court is already booked for this time slot.');
        }

        // 3. Calculate Price
        const { totalPrice } = await this.calculatePrice(userId, startTime, endTime);

        // 4. Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                courtId: data.courtId,
                startTime,
                endTime,
                price: totalPrice,
                status: 'CONFIRMED' // Auto-confirm for now
            }
        });

        return booking;
    },

    // Helper: Check if time is peak
    isPeakTime(date: Date): boolean {
        const hour = date.getHours();
        const day = date.getDay(); // 0 = Sun, 6 = Sat
        const isWeekend = day === 0 || day === 6;

        if (isWeekend) {
            return hour >= PEAK_HOURS.WEEKEND.start && hour < PEAK_HOURS.WEEKEND.end;
        } else {
            return hour >= PEAK_HOURS.WEEKDAY.start && hour < PEAK_HOURS.WEEKDAY.end;
        }
    }
};
