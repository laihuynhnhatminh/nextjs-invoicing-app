import {
  createInvoice,
  getInvoiceById,
  getInvoicesByUserId,
} from '@/data-access/invoices';
import type { InvoiceInsert, InvoiceSelect } from '@/db/schema';

export async function createInvoiceUseCase(
  invoice: InvoiceInsert,
): Promise<number> {
  return createInvoice(invoice);
}

export async function getInvoicesByUserIdUseCase(
  userId: string,
): Promise<InvoiceSelect[]> {
  return getInvoicesByUserId(userId);
}

export async function getInvoiceByIdUseCase(
  id: number,
): Promise<InvoiceSelect> {
  return getInvoiceById(id);
}
