import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { API_URL } from '@smashpoint/shared'; // Unused
import prisma from './db';
import * as userController from './controllers/userController';
import * as courtController from './controllers/courtController';
import * as bookingController from './controllers/bookingController';
// import * as membershipController from './controllers/membershipController'; // Unused
import { requireAuth } from './middleware/auth';

dotenv.config();

import * as staffController from './controllers/staffController';
import { requireStaff } from './middleware/auth';
import { posController } from './controllers/posController';

export const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Smashpoint API is running!');
});

app.get('/api/health', async (req, res) => {
    try {
        const userCount = await prisma.user.count();
        res.json({ status: 'ok', timestamp: new Date().toISOString(), userCount });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});

app.get('/api/me', requireAuth, userController.getMe);

// Core Routes
app.get('/api/courts', courtController.listCourts);
app.get('/api/bookings/availability', bookingController.bookingController.getAvailability);
app.post('/api/bookings', requireAuth, bookingController.bookingController.createBooking);

// Staff Routes
app.get('/api/staff/schedule', requireStaff, staffController.getDailySchedule);
app.post('/api/staff/checkin/:id', requireStaff, staffController.checkInBooking);
app.post('/api/staff/walkin', requireStaff, staffController.createWalkIn);
// Analytics Routes
import * as analyticsController from './controllers/analyticsController';

app.get('/api/analytics/overview', requireStaff, analyticsController.getOverview);
app.get('/api/analytics/revenue', requireStaff, analyticsController.getRevenueChart);
app.get('/api/analytics/utilization', requireStaff, analyticsController.getUtilizationHeatmap);

app.get('/api/pos/products', requireStaff, posController.getProducts);
app.post('/api/pos/orders', requireStaff, posController.createOrder);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
