# Smashpoint Pickleball

A comprehensive management platform for indoor pickleball facilities.
This application handles court bookings, memberships, staff operations, point-of-sale, and analytics.

## Documentation

- **[Setup & Development Guide](docs/SETUP.md)**: Instructions for installing, configuring, and running the application locally.
- **[Database Schema](docs/DATABASE.md)**: Detailed breakdown of the PostgreSQL schema, models, and enums.
- **[Business Logic](docs/BUSINESS_LOGIC.md)**: Explanation of core formulas including pricing, utilization rates, and booking rules.

## Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Prisma ORM
- **Testing**: Playwright, Jest
- **CI/CD**: GitHub Actions

## Quick Start

1.  Install dependencies: `npm install`
2.  Start database: `docker-compose up -d`
3.  Run migrations: `npx prisma migrate dev --schema=apps/server/prisma/schema.prisma`
4.  Start app: `npm run dev`
