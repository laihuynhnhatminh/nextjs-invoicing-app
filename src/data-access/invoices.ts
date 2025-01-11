import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import {
  customers,
  InvoiceInsert,
  invoices,
  InvoiceWithCustomer,
  PublicInvoiceWithCustomer,
  StatusEnum,
} from '@/db/schema';

export async function createInvoice(invoice: InvoiceInsert): Promise<number> {
  const res = await db.insert(invoices).values(invoice).returning({
    id: invoices.id,
  });

  return res[0].id;
}

export async function getInvoicesByUserId(
  userId: string,
): Promise<InvoiceWithCustomer[]> {
  const res = await db
    .select()
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(and(eq(invoices.userId, userId), isNull(invoices.organizationId)))
    .execute();

  return res.map(row => ({
    ...row.invoices,
    customer: row.customers,
  }));
}

export async function getInvoicesOfOrganizationByUserId(
  userId: string,
  organizationId: string,
): Promise<InvoiceWithCustomer[]> {
  const res = await db
    .select()
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(
      and(
        eq(invoices.userId, userId),
        eq(invoices.organizationId, organizationId),
      ),
    )
    .execute();

  return res.map(row => ({
    ...row.invoices,
    customer: row.customers,
  }));
}

export async function getUserInvoiceById(
  userId: string,
  invoiceId: number,
): Promise<InvoiceWithCustomer> {
  const [res] = await db
    .select()
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        isNull(invoices.organizationId),
      ),
    )
    .limit(1);

  return {
    ...res.invoices,
    customer: res.customers,
  };
}

export async function getUserInvoiceOfOrganizationById(
  userId: string,
  invoiceId: number,
  organizationId: string,
): Promise<InvoiceWithCustomer> {
  const [res] = await db
    .select()
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        eq(invoices.organizationId, organizationId),
      ),
    )
    .limit(1);

  return {
    ...res.invoices,
    customer: res.customers,
  };
}

export async function getPublicInvoice(
  invoiceId: number,
): Promise<{ status: StatusEnum; value: number }> {
  const [res] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .limit(1);

  return res;
}

export async function getPublicInvoiceById(
  invoiceId: number,
): Promise<PublicInvoiceWithCustomer> {
  const [res] = await db
    .select({
      id: invoices.id,
      status: invoices.status,
      value: invoices.value,
      description: invoices.description,
      createTs: invoices.createTs,
      name: customers.name,
    })
    .from(invoices)
    .innerJoin(customers, eq(invoices.customerId, customers.id))
    .where(eq(invoices.id, invoiceId))
    .limit(1);

  return res;
}

export async function updateInvoiceStatus(
  userId: string,
  invoiceId: number,
  status: StatusEnum,
): Promise<void> {
  await db
    .update(invoices)
    .set({ status })
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        isNull(invoices.organizationId),
      ),
    )
    .execute();
}

export async function updateOrganizationInvoiceStatus(
  userId: string,
  invoiceId: number,
  organizationId: string,
  status: StatusEnum,
): Promise<void> {
  await db
    .update(invoices)
    .set({ status })
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        eq(invoices.organizationId, organizationId),
      ),
    )
    .execute();
}

export async function updateInvoiceSuccessPaymentStatus(
  invoiceId: number,
): Promise<void> {
  await db
    .update(invoices)
    .set({ status: StatusEnum.PAID })
    .where(eq(invoices.id, invoiceId))
    .execute();
}

export async function deleteUserInvoice(
  userId: string,
  invoiceId: number,
): Promise<void> {
  await db
    .delete(invoices)
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        isNull(invoices.organizationId),
      ),
    )
    .execute();
}

export async function deleteOrganizationInvoice(
  userId: string,
  invoiceId: number,
  organizationId: string,
): Promise<void> {
  await db
    .delete(invoices)
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.userId, userId),
        eq(invoices.organizationId, organizationId),
      ),
    )
    .execute();
}
