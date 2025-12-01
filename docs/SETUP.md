# Setup & Development Guide

## Prerequisites
- **Node.js**: v18 or higher
- **npm**: v10+
- **Docker Desktop**: For running the PostgreSQL database.
- **Git**: For version control.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mainfire/pickleball.git
    cd pickleball
    ```

2.  **Install dependencies**:
    This is a monorepo managed by Turbo. Run `npm install` in the root.
    ```bash
    npm install
    ```

## Database Setup

1.  **Start PostgreSQL**:
    Use Docker Compose to spin up the database container.
    ```bash
    docker-compose up -d
    ```

2.  **Environment Variables**:
    Ensure you have a `.env` file in the root (and `apps/server/.env` if needed, though the root one is often sufficient for monorepos if configured, but here we use per-app envs).
    
    **apps/server/.env**:
    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/smashpoint?schema=public"
    PORT=3001
    JWT_SECRET="supersecret"
    ```

3.  **Run Migrations**:
    Apply the Prisma schema to the database.
    ```bash
    npx prisma migrate dev --schema=apps/server/prisma/schema.prisma
    ```

4.  **Seed Database**:
    Populate the database with initial data (courts, plans, admin user).
    ```bash
    npx prisma db seed
    ```

## Running the Application

1.  **Development Mode**:
    Start both the client (Vite) and server (Express) concurrently.
    ```bash
    npm run dev
    ```
    - Client: [http://localhost:5173](http://localhost:5173)
    - Server: [http://localhost:3001](http://localhost:3001)

2.  **Build**:
    Build all packages.
    ```bash
    npm run build
    ```

## Testing & Quality

1.  **Linting**:
    Check for code quality issues.
    ```bash
    npm run lint
    ```

2.  **E2E Tests**:
    Run Playwright tests.
    ```bash
    npx playwright test
    ```

## CI/CD
The project uses **GitHub Actions** for CI/CD.
- Workflow file: `.github/workflows/ci.yml`
- Triggers: Push to `main`, Pull Requests.
- Jobs: Lint, Build, Test (with Postgres service).
