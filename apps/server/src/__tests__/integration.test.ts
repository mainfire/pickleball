import request from 'supertest';
import { app } from '../index'; // Need to export app
// import prisma from '../db'; // Unused

// Mock Auth Middleware to bypass real checks
jest.mock('../middleware/auth', () => ({
    requireAuth: (req: any, res: any, next: any) => {
        req.headers['x-user-email'] = 'test@example.com';
        next();
    },
    requireStaff: (req: any, res: any, next: any) => {
        next();
    }
}));

describe('Integration Tests', () => {
    // We ideally want a test DB, but for this MVP check we might hit the local dev DB
    // CAUTION: This might dirty the dev DB. In a real CI, use a separate DB.
    // For now, we will just test read-only endpoints or ensure cleanup.

    it('GET /api/courts should return courts', async () => {
        const res = await request(app).get('/api/courts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /api/bookings/availability should return slots', async () => {
        const today = new Date().toISOString().split('T')[0];
        const res = await request(app).get(`/api/bookings/availability?date=${today}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('startTime');
            expect(res.body[0]).toHaveProperty('availableCourtIds');
        }
    });

    it('GET /api/staff/schedule should return bookings', async () => {
        const today = new Date().toISOString().split('T')[0];
        const res = await request(app).get(`/api/staff/schedule?date=${today}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
