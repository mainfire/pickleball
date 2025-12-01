# Business Logic & Formulas

This document outlines the core business rules and mathematical formulas implemented in the Smashpoint Pickleball backend.

## 1. Court Pricing Engine
**Source**: `apps/server/src/services/bookingService.ts`

### Base Rates
Pricing is determined by the time of day (Peak vs Off-Peak).
- **Peak Rate**: $60.00 / hour
- **Off-Peak Rate**: $40.00 / hour

### Peak Hour Definitions
- **Weekdays (Mon-Fri)**: 5:00 PM - 9:00 PM (17:00 - 21:00)
- **Weekends (Sat-Sun)**: 8:00 AM - 2:00 PM (08:00 - 14:00)

### Price Calculation Formula
The final price for a booking is calculated as:

$$
\text{Price} = \text{BaseRate} \times \text{Duration(Hours)} \times (1 - \text{MembershipDiscount})
$$

Where:
- `BaseRate` is determined by the start time of the booking.
- `Duration` is `(endTime - startTime)` in hours.
- `MembershipDiscount` is a percentage (0.0 to 1.0) defined in the user's `MembershipPlan`.

**Note**: If a booking straddles peak and off-peak times, the rate at the **start time** currently applies to the entire duration (MVP simplification).

---

## 2. Analytics & Reporting
**Source**: `apps/server/src/controllers/analyticsController.ts`

### Utilization Rate
Measures how efficiently the facility is being used.

$$
\text{Utilization} = \left( \frac{\text{Total Booked Hours}}{\text{Total Available Hours}} \right) \times 100
$$

- **Total Booked Hours**: Sum of duration of all non-cancelled bookings in the period.
- **Total Available Hours**:
  $$
  8 \text{ Courts} \times 17 \text{ Operating Hours/Day} \times \text{Days in Period}
  $$
- **Operating Hours**: 6:00 AM - 11:00 PM (17 hours).

### Revenue
Total revenue is calculated as the sum of the `price` field for all bookings created within the selected period, excluding cancelled bookings.

---

## 3. Booking Rules

### Booking Window
Users can only book a certain number of days in advance.
- **Default (Guest)**: 5 days.
- **Members**: Defined by `MembershipPlan.bookingWindowDays` (e.g., 7, 14 days).

### Conflict Resolution
The system enforces a strict no-overlap policy. A booking is rejected if:
$$
(\text{NewStart} < \text{ExistingEnd}) \land (\text{NewEnd} > \text{ExistingStart})
$$
for the same `courtId`.

### Cancellation
- **Refund Policy**: (To be implemented) Full refund if cancelled > 24 hours in advance.
