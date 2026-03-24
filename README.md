# Triton Tech Contact API

Node.js + Express + Prisma + PostgreSQL backend for the contact form.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Update `DATABASE_URL` in `.env` with your PostgreSQL connection string.

4. Run migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## Frontend Config

In frontend project, create a `.env` file:

```
VITE_API_URL=https://your-api.vercel.app
```

## Endpoints

- `POST /api/contact` — Submit a contact form
- `GET /api/contacts` — List all submissions
