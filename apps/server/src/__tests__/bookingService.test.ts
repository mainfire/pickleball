const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('BookingService', () => {
    beforeEach(() => {
        mockReset(prismaMock);
    });

    describe('calculatePrice', () => {
        it('should calculate peak price correctly for non-members', async () => {
            // Mock Membership (None)
            prismaMock.membership.findFirst.mockResolvedValue(null);

            // Peak Time: Friday 6 PM
            const startTime = new Date('2023-10-27T18:00:00');
            const endTime = new Date('2023-10-27T19:00:00');

            const result = await bookingService.calculatePrice('user-1', startTime, endTime);

            expect(result.totalPrice).toBe(60); // $60/hr base
            expect(result.isPeak).toBe(true);
            expect(result.appliedDiscount).toBe(0);
        });

        it('should calculate off-peak price correctly for non-members', async () => {
            prismaMock.membership.findFirst.mockResolvedValue(null);

            // Off-Peak Time: Friday 10 AM
            const startTime = new Date('2023-10-27T10:00:00');
            const endTime = new Date('2023-10-27T11:00:00');

            const result = await bookingService.calculatePrice('user-1', startTime, endTime);

            expect(result.totalPrice).toBe(40); // $40/hr base
            expect(result.isPeak).toBe(false);
        });

        it('should apply discount for members', async () => {
            // Mock Platinum Membership (20% off)
            prismaMock.membership.findFirst.mockResolvedValue({
                id: 'mem-1',
                userId: 'user-1',
                planId: 'plan-1',
                isActive: true,
                startDate: new Date(),
                endDate: new Date('2024-01-01'),
                createdAt: new Date(),
                updatedAt: new Date(),
                plan: {
                    id: 'plan-1',
                    name: 'Platinum',
                    price: 100,
                    durationDays: 365,
                    courtDiscountPercent: 0.2,
                    bookingWindowDays: 14,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            } as any);

            // Peak Time
            const startTime = new Date('2023-10-27T18:00:00');
            const endTime = new Date('2023-10-27T19:00:00');

            const result = await bookingService.calculatePrice('user-1', startTime, endTime);

            // $60 * (1 - 0.2) = $48
            expect(result.totalPrice).toBe(48);
            expect(result.appliedDiscount).toBe(0.2);
        });
    });

    describe('validateBookingRules', () => {
        it('should throw error if booking is outside window', async () => {
            // Mock Bronze Plan (5 days)
            prismaMock.membership.findFirst.mockResolvedValue({
                plan: { bookingWindowDays: 5 }
            } as any);

            // Booking 10 days in future
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 10);

            await expect(bookingService.validateBookingRules('user-1', futureDate))
                .rejects
                .toThrow(/Booking too far in advance/);
        });

        it('should pass if booking is inside window', async () => {
            prismaMock.membership.findFirst.mockResolvedValue({
                plan: { bookingWindowDays: 5 }
            } as any);

            // Booking 1 day in future
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);

            await expect(bookingService.validateBookingRules('user-1', futureDate))
                .resolves
                .toBe(true);
        });
    });
});
