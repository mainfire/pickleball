import { Request, Response } from 'express';
import * as courtService from '../services/courtService';
import { CreateCourtSchema } from '@smashpoint/shared';

export const listCourts = async (req: Request, res: Response) => {
    try {
        const courts = await courtService.getAllCourts();
        res.json(courts);
    } catch (error) {
        console.error('Error fetching courts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createCourt = async (req: Request, res: Response) => {
    const validation = CreateCourtSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    const { name, type, surface } = validation.data;

    try {
        // Cast type to any to avoid strict enum mismatch if necessary, or import CourtType
        const court = await courtService.createCourt(name, type as any, surface);
        res.status(201).json(court);
    } catch (error) {
        console.error('Error creating court:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
