import prisma from '../db';
import { Role } from '@prisma/client';

export const createUser = async (email: string, name?: string) => {
    return prisma.user.create({
        data: {
            email,
            name,
            role: Role.USER,
        },
    });
};

export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        include: {
            memberships: true,
            bookings: true,
        },
    });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
        include: {
            memberships: true,
            bookings: true,
        },
    });
};
