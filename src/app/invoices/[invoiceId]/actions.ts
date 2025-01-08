'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { validateUserAction } from '@/actions/auth';
import { InvoiceSelect, StatusEnum } from '@/db/schema';
import { authenticatedAction } from '@/lib/safe-action';
import {
  deleteInvoiceUseCase,
  getUserInvoiceByIdUseCase,
  updateInvoiceStatusUseCase,
} from '@/use-cases/invoices';

import { deleteInvoice, searchInvoice, updateInvoice } from './validations';

export const getUserInvoiceByIdAction = async (
  id: string,
): Promise<InvoiceSelect | null> => {
  const userId = await validateUserAction();
  const invoiceId = validateInvoiceId(id);

  const [data, error] = await handleSafeUserInvoiceByIdAction(userId)({
    id: invoiceId,
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
  const userId = await validateUserAction();
  const id = formData.get('id') as string;
  const status = formData.get('status') as StatusEnum;
  const invoiceId = validateInvoiceId(id);

  const [, error] = await handleSafeUpdateUserInvoiceByIdAction(userId)({
    id: invoiceId,
    status,
  });

  if (error) {
    throw error;
  }

  revalidatePath(`/invoices/${id}`);
};

export const deleteUserInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const userId = await validateUserAction();
  const id = formData.get('id') as string;
  const invoiceId = validateInvoiceId(id);

  const [, error] = await handleSafeDeleteInvoiceAction(userId)({
    id: invoiceId,
  });

  if (error) {
    throw error;
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
};

const validateInvoiceId = (id: string): number => {
  const invoiceId = parseInt(id, 10);

  if (Number.isNaN(invoiceId)) {
    throw new Error('Invalid invoice ID');
  }

  return invoiceId;
};

const handleSafeUserInvoiceByIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(searchInvoice)
    .handler(async ({ input: { id } }) =>
      getUserInvoiceByIdUseCase(userId, id),
    );

const handleSafeUpdateUserInvoiceByIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(updateInvoice)
    .handler(async ({ input: { id, status } }) =>
      updateInvoiceStatusUseCase(userId, id, status),
    );

const handleSafeDeleteInvoiceAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(deleteInvoice)
    .handler(async ({ input: { id } }) => deleteInvoiceUseCase(userId, id));
