# Database Schema Documentation

This document provides a detailed breakdown of the PostgreSQL database schema used in Smashpoint Pickleball.
The schema is managed using **Prisma ORM**.

## Enums

### Role
Defines user permissions.
- `USER`: Standard registered user.
- `MEMBER`: User with an active membership.
- `STAFF`: Staff member with access to the staff console.
- `ADMIN`: System administrator with full access.

### CourtType
- `INDOOR`
- `OUTDOOR`

### BookingStatus
- `PENDING`: Initial state.
- `CONFIRMED`: Payment successful or auto-confirmed.
- `CANCELLED`: Booking cancelled by user or staff.
- `COMPLETED`: Booking time has passed.

### TransactionType
- `PAYMENT`
- `REFUND`
- `ADJUSTMENT`

### TransactionStatus
- `PENDING`
- `COMPLETED`
- `FAILED`

### MatchType
- `SINGLES`: 1v1
- `DOUBLES`: 2v2

## Models

### User
Core user entity.
- `id`: UUID
- `email`: Unique email address.
- `role`: See [Role](#role).
- `profile`: Relation to [Profile](#profile).
- `memberships`: History of memberships.

### Profile
Extended user details.
- `skillRating`: DUPR or internal rating.
- `preferences`: JSON blob for notification settings.

### Court
Physical court resource.
- `name`: e.g., "Court 1".
- `type`: [CourtType](#courttype).
- `surface`: Court surface material.

### Booking
Reservation of a court.
- `startTime` / `endTime`: Time range of the booking.
- `price`: Calculated price at time of booking.
- `status`: [BookingStatus](#bookingstatus).
- `court`: Relation to [Court](#court).
- `user`: Relation to [User](#user).

### MembershipPlan
Defines available membership tiers.
- `name`: e.g., "Gold Annual".
- `price`: Cost of the plan.
- `durationDays`: Length of validity (e.g., 365).
- **Business Rules**:
    - `bookingWindowDays`: How far in advance members can book.
    - `courtDiscountPercent`: Discount on court fees (0.0 - 1.0).
    - `monthlyFreeSessions`: Number of free bookings per month.

### Membership
Active or past subscription for a user.
- `startDate` / `endDate`: Validity period.
- `isActive`: Boolean flag.
- `plan`: Relation to [MembershipPlan](#membershipplan).

### Transaction
Financial record.
- `amount`: Monetary value.
- `type`: [TransactionType](#transactiontype).
- `status`: [TransactionStatus](#transactionstatus).
- `booking`: Optional relation to a specific booking.
- `invoice`: Optional relation to an invoice.

### Product & POS
Point of Sale system.
- `Product`: Inventory items (rackets, balls, drinks).
- `POSOrder`: A sales transaction containing multiple items.
- `POSItem`: Line item in an order.

### Event & League
- `Event`: One-time or recurring events (clinics, socials).
- `League`: Seasonal competition container.
- `Match`: Records of games played, linked to players and leagues.

### SystemConfig
Key-value store for dynamic system settings (e.g., global guest fees).
