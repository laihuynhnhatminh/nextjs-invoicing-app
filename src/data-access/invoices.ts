import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import type { InvoiceInsert, InvoiceSelect, StatusEnum } from '@/db/schema';
import { invoices } from '@/db/schema';

export async function createInvoice(invoice: InvoiceInsert): Promise<number> {
  const res = await db.insert(invoices).values(invoice).returning({
    id: invoices.id,
  });

  return res[0].id;
}

export async function getInvoicesByUserId(
  userId: string,
): Promise<InvoiceSelect[]> {
  return db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId))
    .execute();
}

export async function getUserInvoiceById(
  userId: string,
  invoiceId: number,
): Promise<InvoiceSelect> {
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)))
    .limit(1);

  return invoice;
}

export async function updateInvoiceStatus(
  userId: string,
  invoiceId: number,
  status: StatusEnum,
): Promise<void> {
  await db
    .update(invoices)
    .set({ status })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)))
    .execute();
}

export async function deleteUserInvoice(
  userId: string,
  invoiceId: number,
): Promise<void> {
  await db
    .delete(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)))
    .execute();
}
