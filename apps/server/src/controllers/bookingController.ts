import { Request, Response } from 'express';
import { bookingService } from '../services/bookingService';
import prisma from '../db';
import { CreateBookingSchema, AvailabilityQuerySchema } from '@smashpoint/shared';

export const bookingController = {
    async getAvailability(req: Request, res: Response) {
        try {
            const query = AvailabilityQuerySchema.parse(req.query);
            const slots = await bookingService.findAvailableSlots(query.date);
            res.json(slots);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async createBooking(req: Request, res: Response) {
        try {
            // Mock Auth: Get User ID from header
            const userEmail = req.headers['x-user-email'] as string;
            if (!userEmail) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // In a real app, we'd fetch the user ID from the DB based on the email/token
            // For now, let's assume we have a helper or just fetch it
            // Quick hack: Fetch user by email
            const user = await prisma.user.findUnique({ where: { email: userEmail } });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const data = CreateBookingSchema.parse(req.body);
            const booking = await bookingService.createBooking(user.id, data);
            res.status(201).json(booking);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
};
