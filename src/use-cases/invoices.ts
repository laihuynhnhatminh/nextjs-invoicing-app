import {
  createInvoice,
  deleteUserInvoice,
  getInvoicesByUserId,
  getUserInvoiceById,
  updateInvoiceStatus,
} from '@/data-access/invoices';
import type { InvoiceInsert, InvoiceSelect, StatusEnum } from '@/db/schema';

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

export async function getUserInvoiceByIdUseCase(
  userId: string,
  id: number,
): Promise<InvoiceSelect> {
  return getUserInvoiceById(userId, id);
}

export async function updateInvoiceStatusUseCase(
  userId: string,
  id: number,
  status: StatusEnum,
): Promise<void> {
  return updateInvoiceStatus(userId, id, status);
}

export async function deleteInvoiceUseCase(
  userId: string,
  id: number,
): Promise<void> {
  return deleteUserInvoice(userId, id);
}
