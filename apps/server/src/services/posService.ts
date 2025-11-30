import prisma from '../db';

export const posService = {
    async getProducts() {
        return prisma.product.findMany({
            where: { deletedAt: null },
            orderBy: { name: 'asc' }
        });
    },

    async createOrder(data: { items: { productId: string; quantity: number }[], userId?: string }) {
        // 1. Calculate total and verify stock
        let total = 0;
        const orderItems = [];

        for (const item of data.items) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) throw new Error(`Product ${item.productId} not found`);

            // In a real app, check stock here
            // if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

            total += product.price * item.quantity;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });
        }

        // 2. Create Order & Transaction
        const order = await prisma.pOSOrder.create({
            data: {
                total,
                status: 'COMPLETED',
                userId: data.userId,
                items: {
                    create: orderItems
                },
                transaction: {
                    create: {
                        amount: total,
                        type: 'PAYMENT',
                        status: 'COMPLETED',
                        userId: data.userId || 'GUEST', // Fallback for guest checkout
                    }
                }
            },
            include: {
                items: { include: { product: true } },
                transaction: true
            }
        });

        return order;
    }
};
