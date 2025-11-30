import { z } from 'zod';

export const RoleEnum = z.enum(['USER', 'MEMBER', 'STAFF', 'ADMIN']);
export const CourtTypeEnum = z.enum(['INDOOR', 'OUTDOOR']);
export const BookingStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
export const MembershipTypeEnum = z.enum(['GOLD', 'SILVER', 'BRONZE']);

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    email: z.string().email(),
    name: z.string().min(1).optional(),
    role: RoleEnum.default('USER'),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export const CreateUserSchema = UserSchema.pick({ email: true, name: true, phone: true, address: true }).extend({
    password: z.string().min(6).optional(),
});

export const CourtSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1),
    type: CourtTypeEnum.default('INDOOR'),
    surface: z.string().optional(),
});

export const CreateCourtSchema = CourtSchema.pick({ name: true, type: true, surface: true });

export const BookingSchema = z.object({
    id: z.string().uuid().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    courtId: z.string().uuid(),
    userId: z.string().uuid(),
    status: BookingStatusEnum.default('PENDING'),
    price: z.number().nonnegative(),
    notes: z.string().optional(),
});

export const CreateBookingSchema = z.object({
    courtId: z.string().uuid(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    participants: z.array(z.string().uuid()).optional(),
});

export const AvailabilityQuerySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    courtId: z.string().uuid().optional(),
});

export const MembershipSchema = z.object({
    id: z.string().uuid().optional(),
    type: MembershipTypeEnum,
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    isActive: z.boolean().default(true),
    userId: z.string().uuid(),
});

export const CreateMembershipSchema = z.object({
    planId: z.string().uuid()
});
