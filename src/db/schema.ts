import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// Enums
export const statusEnum = pgEnum('status', [
  'open',
  'paid',
  'void',
  'uncollectible',
]);

// Tables
export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  createTs: timestamp('create_ts').defaultNow().notNull(),
  value: integer('value').notNull(),
  status: statusEnum('status').notNull(),
  userId: text('userId').notNull(),
  description: text('description').notNull(),
});

// Type
export type InvoiceInsert = typeof invoices.$inferInsert;
export type InvoiceSelect = typeof invoices.$inferSelect;
