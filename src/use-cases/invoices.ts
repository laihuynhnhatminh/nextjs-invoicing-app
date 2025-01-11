import {
  createInvoice,
  deleteOrganizationInvoice,
  deleteUserInvoice,
  getInvoicesByUserId,
  getInvoicesOfOrganizationByUserId,
  getPublicInvoice,
  getPublicInvoiceById,
  getUserInvoiceById,
  getUserInvoiceOfOrganizationById,
  updateInvoiceStatus,
  updateInvoiceSuccessPaymentStatus,
  updateOrganizationInvoiceStatus,
} from '@/data-access/invoices';
import {
  InvoiceInsert,
  InvoiceWithCustomer,
  PublicInvoiceWithCustomer,
  StatusEnum,
} from '@/db/schema';

export async function createInvoiceUseCase(
  invoice: InvoiceInsert,
): Promise<number> {
  return createInvoice(invoice);
}

export async function getInvoicesByUserIdUseCase(
  userId: string,
  organizationId?: string,
): Promise<InvoiceWithCustomer[]> {
  if (organizationId) {
    return getInvoicesOfOrganizationByUserId(userId, organizationId);
  }

  return getInvoicesByUserId(userId);
}

export async function getUserInvoiceByIdUseCase(
  userId: string,
  id: number,
  organizationId?: string,
): Promise<InvoiceWithCustomer> {
  if (organizationId) {
    return getUserInvoiceOfOrganizationById(userId, id, organizationId);
  }

  return getUserInvoiceById(userId, id);
}

export async function getPublicInvoiceUseCase(
  id: number,
): Promise<{ status: StatusEnum; value: number }> {
  return getPublicInvoice(id);
}

export async function getPublicInvoiceByIdUseCase(
  id: number,
): Promise<PublicInvoiceWithCustomer> {
  return getPublicInvoiceById(id);
}

export async function updateInvoiceStatusUseCase(
  userId: string,
  id: number,
  status: StatusEnum,
  organizationId?: string,
): Promise<void> {
  if (organizationId) {
    return updateOrganizationInvoiceStatus(userId, id, organizationId, status);
  }

  return updateInvoiceStatus(userId, id, status);
}

export async function updateInvoiceSuccessPaymentUseCase(
  id: number,
): Promise<void> {
  return updateInvoiceSuccessPaymentStatus(id);
}

export async function deleteInvoiceUseCase(
  userId: string,
  id: number,
  organizationId?: string,
): Promise<void> {
  if (organizationId) {
    return deleteOrganizationInvoice(userId, id, organizationId);
  }

  return deleteUserInvoice(userId, id);
}
