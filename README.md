# Innonet - Entrepreneur Social Platform

A social media platform for Bangladeshi entrepreneurs, innovators, and startup founders.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your database:
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your database credentials

3. Run database migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- bcryptjs for authentication

## Features (MVP)

- User authentication (signup/login)
- User profiles with different types (Entrepreneur, Investor, Mentor, Service Provider)
- Create and view posts
- Like and comment system
- Follow system
- Real-time feed

## Project Structure

```
innonet/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── lib/             # Utilities and database client
│   └── types/           # TypeScript types
├── prisma/              # Database schema
└── public/              # Static assets
```

## Next Steps

- Implement like/comment functionality
- Add user profiles
- Implement follow system
- Add image upload
- Create messaging system
- Add search functionality
