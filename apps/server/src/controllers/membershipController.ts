import { Request, Response } from 'express';
import * as membershipService from '../services/membershipService';
import { CreateMembershipSchema } from '@smashpoint/shared';
import prisma from '../db';

export const createMembership = async (req: Request, res: Response) => {
    const validation = CreateMembershipSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const { planId } = validation.data;

    // Mock user email from header
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail) return res.status(401).json({ error: 'User email required' });

    const { getUserByEmail } = await import('../services/userService');
    const user = await getUserByEmail(userEmail);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Fetch Plan to get duration
    // const { PrismaClient } = require('@prisma/client');
    // const prisma = new PrismaClient();
    // Use global prisma instance imported from ../db
    // But wait, I need to import it at the top.
    // I'll add the import at the top and use it here.
    const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });

    if (!plan) {
        return res.status(404).json({ error: 'Membership Plan not found' });
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    try {
        const membership = await membershipService.createMembership(
            user.id,
            planId,
            startDate,
            endDate
        );
        res.status(201).json(membership);
    } catch (error) {
        console.error('Error creating membership:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMyMembership = async (req: Request, res: Response) => {
    // Mock user email from header
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail) return res.status(401).json({ error: 'User email required' });

    const { getUserByEmail } = await import('../services/userService');
    const user = await getUserByEmail(userEmail);
    if (!user) return res.status(404).json({ error: 'User not found' });

    try {
        const membership = await membershipService.getActiveMembership(user.id);
        res.json(membership || { message: 'No active membership' });
    } catch (error) {
        console.error('Error fetching membership:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
