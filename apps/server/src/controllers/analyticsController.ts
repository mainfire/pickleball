import { Request, Response } from 'express';
import prisma from '../db';

/**
 * Get high-level overview stats
 */
export const getOverview = async (req: Request, res: Response) => {
    try {
        const period = req.query.period as string || '30d'; // Default 30 days

        // Date Logic
        const now = new Date();
        const past = new Date();
        past.setDate(now.getDate() - 30); // Simplified for MVP

        // 1. Total Revenue (Sales in period)
        const sales = await prisma.booking.findMany({
            where: {
                createdAt: { gte: past },
                status: { not: 'CANCELLED' }
            },
            select: { price: true }
        });
        const totalRevenue = sales.reduce((sum: number, b: { price: number }) => sum + b.price, 0);

        // 2. Active Members
        const activeMembers = await prisma.membership.count({
            where: { isActive: true, endDate: { gte: now } }
        });

        // 3. Utilization (Court Usage in period)
        const usageBookings = await prisma.booking.findMany({
            where: {
                startTime: { gte: past },
                status: { not: 'CANCELLED' }
            },
            select: { startTime: true, endTime: true }
        });

        const bookedMilliseconds = usageBookings.reduce((sum, b) => {
            return sum + (new Date(b.endTime).getTime() - new Date(b.startTime).getTime());
        }, 0);

        const bookedHours = bookedMilliseconds / (1000 * 60 * 60);

        // Total Hours = 8 courts * 17 hours/day * 30 days
        const totalHoursAvailable = 8 * 17 * 30;

        const utilizationRate = Math.round((bookedHours / totalHoursAvailable) * 100);

        res.json({
            revenue: totalRevenue,
            activeMembers,
            utilizationRate,
            period
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get daily revenue for chart
 */
export const getRevenueChart = async (req: Request, res: Response) => {
    try {
        const past = new Date();
        past.setDate(past.getDate() - 30);

        const bookings = await prisma.booking.findMany({
            where: {
                createdAt: { gte: past },
                status: { not: 'CANCELLED' }
            },
            select: { startTime: true, price: true }
        });

        const dailyRevenue: Record<string, number> = {};

        bookings.forEach((b: { startTime: Date; price: number }) => {
            const date = b.startTime.toISOString().split('T')[0];
            dailyRevenue[date] = (dailyRevenue[date] || 0) + b.price;
        });

        const chartData = Object.entries(dailyRevenue).map(([date, revenue]) => ({
            date,
            revenue
        })).sort((a, b) => a.date.localeCompare(b.date));

        res.json(chartData);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get utilization heatmap data
 */
export const getUtilizationHeatmap = async (req: Request, res: Response) => {
    try {
        const past = new Date();
        past.setDate(past.getDate() - 30);

        const bookings = await prisma.booking.findMany({
            where: {
                startTime: { gte: past },
                status: { not: 'CANCELLED' }
            },
            select: { startTime: true }
        });

        const heatmap: Record<string, number> = {};

        bookings.forEach((b: { startTime: Date }) => {
            const date = new Date(b.startTime);
            const day = date.getDay(); // 0-6
            const hour = date.getHours(); // 0-23
            const key = `${day}-${hour}`;
            heatmap[key] = (heatmap[key] || 0) + 1;
        });

        const data = [];
        for (let d = 0; d < 7; d++) {
            for (let h = 6; h < 23; h++) { // Operating hours only
                data.push({
                    day: d,
                    hour: h,
                    value: heatmap[`${d}-${h}`] || 0
                });
            }
        }

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
