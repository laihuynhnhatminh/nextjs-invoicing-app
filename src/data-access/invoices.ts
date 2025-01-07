import { eq } from 'drizzle-orm';

import { db } from '@/db';
import type { InvoiceInsert, InvoiceSelect } from '@/db/schema';
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

export async function getInvoiceById(
  invoiceId: number,
): Promise<InvoiceSelect> {
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .limit(1);

  return invoice;
}
