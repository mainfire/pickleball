import { Request, Response, NextFunction } from 'express';
import prisma from '../db';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // Placeholder: Check for a mock header or valid token
    // In production, verify JWT from Auth0
    const token = req.headers.authorization;
    const mockEmail = req.headers['x-user-email'];

    if (!token && !mockEmail) {
        return res.status(401).json({ error: 'Missing authentication' });
    }

    next();
};

export const requireStaff = async (req: Request, res: Response, next: NextFunction) => {
    const mockEmail = req.headers['x-user-email'] as string;

    if (!mockEmail) {
        return res.status(401).json({ error: 'Missing authentication' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: mockEmail } });

        if (!user || (user.role !== 'STAFF' && user.role !== 'ADMIN')) {
            return res.status(403).json({ error: 'Access denied. Staff only.' });
        }

        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
