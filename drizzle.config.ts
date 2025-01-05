import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});

if (typeof process.env.XATA_DATABASE_URL === 'undefined') {
  throw new Error('XATA_DATABASE_URL must be set in .env file');
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  verbose: true,
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL,
  },
});
