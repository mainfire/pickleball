import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getMe = async (req: Request, res: Response) => {
    // In a real app, req.user would be populated by the auth middleware
    // For now, we'll assume a mock user ID or email is passed in headers for testing
    const email = req.headers['x-user-email'] as string;

    if (!email) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            // Auto-create user if not found (for MVP simplicity)
            const newUser = await userService.createUser(email, 'New User');
            return res.json(newUser);
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
