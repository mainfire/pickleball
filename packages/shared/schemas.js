"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingSchema = exports.BookingSchema = exports.CreateCourtSchema = exports.CourtSchema = exports.CreateUserSchema = exports.UserSchema = exports.BookingStatusEnum = exports.CourtTypeEnum = exports.RoleEnum = void 0;
var zod_1 = require("zod");
exports.RoleEnum = zod_1.z.enum(['USER', 'MEMBER', 'STAFF', 'ADMIN']);
exports.CourtTypeEnum = zod_1.z.enum(['INDOOR', 'OUTDOOR']);
exports.BookingStatusEnum = zod_1.z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1).optional(),
    role: exports.RoleEnum.default('USER'),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.CreateUserSchema = exports.UserSchema.pick({ email: true, name: true, phone: true, address: true }).extend({
    password: zod_1.z.string().min(6).optional(),
});
exports.CourtSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1),
    type: exports.CourtTypeEnum.default('INDOOR'),
    surface: zod_1.z.string().optional(),
});
exports.CreateCourtSchema = exports.CourtSchema.pick({ name: true, type: true, surface: true });
exports.BookingSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
    courtId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    status: exports.BookingStatusEnum.default('PENDING'),
    price: zod_1.z.number().nonnegative(),
    notes: zod_1.z.string().optional(),
});
exports.CreateBookingSchema = exports.BookingSchema.pick({ startTime: true, endTime: true, courtId: true, notes: true });
