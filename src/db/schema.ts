import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { enumToPgEnum } from './utils/enum-to-pgEnum';

// Enums
export enum StatusEnum {
  OPEN = 'open',
  PAID = 'paid',
  VOID = 'void',
  UNCOLLECTIBLE = 'uncollectible',
}

// pgEnums
export const statusEnum = pgEnum('status', enumToPgEnum(StatusEnum));

// Tables
export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  createTs: timestamp('createTs').defaultNow().notNull(),
  value: integer('value').notNull(),
  status: statusEnum('status').notNull(),
  userId: text('userId').notNull(),
  customerId: integer('customerId')
    .notNull()
    .references(() => customers.id),
  description: text('description').notNull(),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey().notNull(),
  createTs: timestamp('createTs').defaultNow().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  userId: text('userId').notNull(),
});

// Type
export type InvoiceInsert = typeof invoices.$inferInsert;
export type InvoiceSelect = typeof invoices.$inferSelect;

export type CustomerInsert = typeof customers.$inferInsert;
export type CustomerSelect = typeof customers.$inferSelect;
