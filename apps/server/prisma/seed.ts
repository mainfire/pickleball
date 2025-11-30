import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create 8 Courts
    for (let i = 1; i <= 8; i++) {
        const courtName = `Court ${i}`;
        const existingCourt = await prisma.court.findFirst({ where: { name: courtName } });

        if (!existingCourt) {
            await prisma.court.create({
                data: {
                    name: courtName,
                    type: 'INDOOR'
                }
            });
            console.log(`Created ${courtName}`);
        }
    }

    // Create Admin User
    const adminEmail = 'admin@smashpoint.com';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                name: 'Admin User',
                role: 'ADMIN'
            }
        });
        console.log('Created Admin User');
    }

    // Create Membership Plans
    const plans = [
        {
            name: 'Platinum',
            price: 130.0,
            initiationFee: 150.0,
            durationDays: 30,
            bookingWindowDays: 14,
            courtDiscountPercent: 0.20,
            monthlyFreeSessions: 999, // Unlimited
            description: 'The ultimate experience. 14-day booking window, 20% off courts, unlimited open play.'
        },
        {
            name: 'Gold',
            price: 80.0,
            initiationFee: 100.0,
            durationDays: 30,
            bookingWindowDays: 10,
            courtDiscountPercent: 0.10,
            monthlyFreeSessions: 10,
            description: 'For the avid player. 10-day booking window, 10% off courts, 10 free open play sessions.'
        },
        {
            name: 'Silver',
            price: 40.0,
            initiationFee: 50.0,
            durationDays: 30,
            bookingWindowDays: 7,
            courtDiscountPercent: 0.0,
            monthlyFreeSessions: 4,
            description: 'Great value. 7-day booking window, 4 free open play sessions.'
        },
        {
            name: 'Bronze',
            price: 0.0,
            initiationFee: 0.0,
            durationDays: 30,
            bookingWindowDays: 5,
            courtDiscountPercent: 0.0,
            monthlyFreeSessions: 0,
            description: 'Pay as you go access. 5-day booking window.'
        }
    ];

    for (const plan of plans) {
        await prisma.membershipPlan.upsert({
            where: { name: plan.name },
            update: {
                price: plan.price,
                initiationFee: plan.initiationFee,
                bookingWindowDays: plan.bookingWindowDays,
                courtDiscountPercent: plan.courtDiscountPercent,
                monthlyFreeSessions: plan.monthlyFreeSessions,
                description: plan.description
            },
            create: plan
        });
        console.log(`Upserted plan: ${plan.name}`);
    }

    // Create Member User
    const memberEmail = 'member@example.com';
    const existingMember = await prisma.user.findUnique({ where: { email: memberEmail } });
    if (!existingMember) {
        const user = await prisma.user.create({
            data: {
                email: memberEmail,
                name: 'John Doe',
                role: 'MEMBER'
            }
        });
        console.log('Created Member User');

        // Assign Gold Membership to the test user
        const goldPlan = await prisma.membershipPlan.findUnique({ where: { name: 'Gold' } });
        if (goldPlan) {
            await prisma.membership.create({
                data: {
                    userId: user.id,
                    planId: goldPlan.id,
                    startDate: new Date(),
                    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
            });
            console.log('Created Gold Membership for Member');
        }
    }

    // Create Guest User for POS/Walk-ins
    const existingGuest = await prisma.user.findUnique({ where: { id: 'GUEST' } });
    if (!existingGuest) {
        await prisma.user.create({
            data: {
                id: 'GUEST',
                email: 'guest@smashpoint.com',
                name: 'Walk-in Guest',
                role: 'USER'
            }
        });
        console.log('Created Guest User');
    }

    // Create Products
    const products = [
        { name: 'Pro Pickleball Paddle', price: 89.99, sku: 'PAD-001', category: 'Equipment', stock: 50 },
        { name: 'Outdoor Balls (3-pack)', price: 9.99, sku: 'BAL-001', category: 'Equipment', stock: 100 },
        { name: 'Gatorade', price: 2.50, sku: 'DRK-001', category: 'Drinks', stock: 200 },
        { name: 'Water Bottle', price: 1.50, sku: 'DRK-002', category: 'Drinks', stock: 200 },
        { name: 'Protein Bar', price: 3.00, sku: 'SNK-001', category: 'Snacks', stock: 150 },
        { name: 'Smashpoint T-Shirt', price: 24.99, sku: 'APP-001', category: 'Apparel', stock: 75 },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { sku: product.sku },
            update: {
                price: product.price,
                stock: product.stock,
                category: product.category
            },
            create: product
        });
        console.log(`Upserted product: ${product.name}`);
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
