import prisma from '../db';


export const createMembership = async (
    userId: string,
    planId: string,
    startDate: Date,
    endDate: Date
) => {
    // Deactivate existing active memberships
    await prisma.membership.updateMany({
        where: {
            userId,
            isActive: true
        },
        data: {
            isActive: false
        }
    });

    return prisma.membership.create({
        data: {
            userId,
            planId,
            startDate,
            endDate,
            isActive: true
        }
    });
};

export const getActiveMembership = async (userId: string) => {
    return prisma.membership.findFirst({
        where: {
            userId,
            isActive: true,
            endDate: {
                gte: new Date()
            }
        }
    });
};

export const getMembershipHistory = async (userId: string) => {
    return prisma.membership.findMany({
        where: {
            userId
        },
        orderBy: {
            startDate: 'desc'
        }
    });
};
