import {
  createInvoice,
  getInvoiceById,
  getInvoices,
} from '@/data-access/invoices';
import type { InvoiceInsert, InvoiceSelect } from '@/db/schema';

export async function createInvoiceUseCase(
  invoice: InvoiceInsert,
): Promise<number> {
  return createInvoice(invoice);
}

export async function getInvoicesUseCase(): Promise<InvoiceSelect[]> {
  return getInvoices();
}

export async function getInvoiceByIdUseCase(
  id: number,
): Promise<InvoiceSelect> {
  return getInvoiceById(id);
}
