'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { validateUserAction } from '@/actions/auth';
import { InvoiceWithCustomer, StatusEnum } from '@/db/schema';
import { authenticatedAction } from '@/lib/safe-action';
import {
  deleteInvoiceUseCase,
  getUserInvoiceByIdUseCase,
  updateInvoiceStatusUseCase,
} from '@/use-cases/invoices';
import { validateStringAsNumber } from '@/utils/validation';

import { deleteInvoice, searchInvoice, updateInvoice } from './validations';

export const getUserInvoiceByIdAction = async (
  id: string,
): Promise<InvoiceWithCustomer | null> => {
  const { userId, orgId } = await validateUserAction();
  const invoiceId = validateStringAsNumber(id);

  const [data, error] = await handleSafeGetUserInvoiceByIdAction(userId)({
    id: invoiceId,
    organizationId: orgId,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const updateUserInvoiceByIdAction = async (
  formData: FormData,
): Promise<void> => {
  const { userId, orgId } = await validateUserAction();
  const id = formData.get('id') as string;
  const status = formData.get('status') as StatusEnum;
  const invoiceId = validateStringAsNumber(id);

  const [, error] = await handleSafeUpdateUserInvoiceByIdAction(userId)({
    id: invoiceId,
    status,
    organizationId: orgId,
  });

  if (error) {
    throw error;
  }

  revalidatePath(`/invoices/${id}`);
};

export const deleteUserInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const { userId, orgId } = await validateUserAction();
  const id = formData.get('id') as string;
  const invoiceId = validateStringAsNumber(id);

  const [, error] = await handleSafeDeleteInvoiceAction(userId)({
    id: invoiceId,
    organizationId: orgId,
  });

  if (error) {
    throw error;
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
};

const handleSafeGetUserInvoiceByIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(searchInvoice)
    .handler(async ({ input: { id, organizationId } }) =>
      getUserInvoiceByIdUseCase(userId, id, organizationId),
    );

const handleSafeUpdateUserInvoiceByIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(updateInvoice)
    .handler(async ({ input: { id, status, organizationId } }) =>
      updateInvoiceStatusUseCase(userId, id, status, organizationId),
    );

const handleSafeDeleteInvoiceAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(deleteInvoice)
    .handler(async ({ input: { id, organizationId } }) =>
      deleteInvoiceUseCase(userId, id, organizationId),
    );
