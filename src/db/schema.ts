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
  organizationId: text('organizationId'),
  description: text('description').notNull(),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey().notNull(),
  createTs: timestamp('createTs').defaultNow().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  userId: text('userId').notNull(),
  organizationId: text('organizationId'),
});

// Type
export type InvoiceInsert = typeof invoices.$inferInsert;
export type InvoiceSelect = typeof invoices.$inferSelect;
export type InvoiceWithCustomer = InvoiceSelect & { customer: CustomerSelect };
export type PublicInvoiceWithCustomer = Pick<
  InvoiceSelect,
  'id' | 'status' | 'value' | 'description' | 'createTs'
> &
  Pick<CustomerSelect, 'name'>;

export type CustomerInsert = typeof customers.$inferInsert;
export type CustomerSelect = typeof customers.$inferSelect;
