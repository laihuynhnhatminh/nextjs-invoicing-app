'use server';

import { redirect } from 'next/navigation';

import { validateUserAction } from '@/actions/auth';
import { authenticatedAction } from '@/lib/safe-action';
import { createInvoiceUseCase } from '@/use-cases/invoices';

import { createInvoiceSchema } from './validations';

export const createInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const userId = await validateUserAction();
  const value = Number(formData.get('value'));
  const description = formData.get('description') as string;

  const [data, error] = await handleSafeInvoiceAction(userId)({
    value,
    description,
    userId,
  });

  if (error) {
    console.error(error);
  }

  if (data) {
    redirect(`/invoices/${data}`);
  }
};

const handleSafeInvoiceAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(createInvoiceSchema)
    .handler(async ({ input }) => createInvoiceUseCase(input));
