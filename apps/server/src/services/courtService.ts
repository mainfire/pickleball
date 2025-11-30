import prisma from '../db';
import { CourtType } from '@prisma/client';

export const getAllCourts = async () => {
    return prisma.court.findMany({
        orderBy: { name: 'asc' }
    });
};

export const getCourtById = async (id: string) => {
    return prisma.court.findUnique({
        where: { id }
    });
};

export const createCourt = async (name: string, type: CourtType = CourtType.INDOOR, surface?: string) => {
    return prisma.court.create({
        data: {
            name,
            type,
            surface
        }
    });
};

export const updateCourt = async (id: string, name?: string, type?: CourtType, surface?: string) => {
    return prisma.court.update({
        where: { id },
        data: {
            ...(name && { name }),
            ...(type && { type }),
            ...(surface && { surface })
        }
    });
};

export const deleteCourt = async (id: string) => {
    return prisma.court.delete({
        where: { id }
    });
};
