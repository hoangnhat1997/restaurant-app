# Restaurant App

## Overview

A simple web application that allows users to view a list of restaurants and mark them as favorites.

## Technologies Used

- Next.js
- TypeScript
- TRPC
- Prisma
- PostgreSQL

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the PostgreSQL database and update the `DATABASE_URL` in the `.env` file.
4. Run the database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Seed the database:
   ```sh
   npx ts-node prisma/seed.ts
   ```
6. Run the development server:
   ```sh
   npm run dev
   ```

## Usage

- View the list of restaurants.
- Mark a restaurant as a favorite by clicking the heart icon.
- View your favorite restaurants.

## Deployment

- The application can be deployed to Vercel or Heroku for a live demo.

## License

This project is licensed under the MIT License.
