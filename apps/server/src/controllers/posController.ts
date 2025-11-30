import { Request, Response } from 'express';
import { posService } from '../services/posService';

export const posController = {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await posService.getProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async createOrder(req: Request, res: Response) {
        try {
            const order = await posService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
};
