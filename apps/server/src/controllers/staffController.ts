import { Request, Response } from 'express';
import prisma from '../db';
import { bookingService } from '../services/bookingService';
import { CreateBookingSchema } from '@smashpoint/shared';

/**
 * Get all bookings for a specific date, organized by court
 */
export const getDailySchedule = async (req: Request, res: Response) => {
    try {
        const dateStr = req.query.date as string;
        if (!dateStr) return res.status(400).json({ error: 'Date is required' });

        const date = new Date(dateStr);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const bookings = await prisma.booking.findMany({
            where: {
                startTime: { gte: startOfDay },
                endTime: { lte: endOfDay },
                status: { not: 'CANCELLED' }
            },
            include: {
                user: {
                    select: { name: true, email: true, phone: true }
                },
                court: true
            },
            orderBy: { startTime: 'asc' }
        });

        res.json(bookings);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Check in a booking
 */
export const checkInBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // In a real app, we'd have a 'CHECKED_IN' status or a separate AccessLog
        // For now, let's assume we update the status to COMPLETED or keep it CONFIRMED but log it
        // Or better, let's add a 'CHECKED_IN' status to the enum if possible, or just use 'COMPLETED' as a proxy for "Played/Checked In"
        // Actually, let's just return success for now as a mock action, or update notes.

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                // status: 'CHECKED_IN', // Enum doesn't have this yet. 
                // Let's append to notes for now
                notes: {
                    set: `Checked in at ${new Date().toLocaleTimeString()}`
                }
            }
        });

        res.json(booking);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Create a walk-in booking (Admin override)
 */
export const createWalkIn = async (req: Request, res: Response) => {
    try {
        // Staff can book for any user, or a generic "Walk-in" user
        // For now, let's assume they pass a userId or we use a placeholder
        const { userId, ...bookingData } = req.body;

        // If no userId, maybe find/create a "Guest" user?
        // For simplicity, require userId for now (staff can look them up)

        if (!userId) return res.status(400).json({ error: 'User ID is required' });

        const data = CreateBookingSchema.parse(bookingData);

        // Staff might want to bypass rules? 
        // For now, use standard service but maybe we add a 'force' flag later
        const booking = await bookingService.createBooking(userId, data);

        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
