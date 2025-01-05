'use server';

import { redirect } from 'next/navigation';

import { rateLimitByKey } from '@/lib/limiter';
import { unauthenticatedAction } from '@/lib/safe-action';
import { createInvoiceUseCase } from '@/use-cases/invoices';

import { createInvoiceSchema } from './validations';

export const createInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const value = Number(formData.get('value'));
  const description = formData.get('description') as string;

  const [data, error] = await handleSafeInvoiceAction({ value, description });

  if (error) {
    console.error(error);
  }

  if (data) {
    redirect(`/invoices/${data}`);
  }
};

const handleSafeInvoiceAction = unauthenticatedAction
  .createServerAction()
  .input(createInvoiceSchema)
  .handler(async ({ input }) => {
    await rateLimitByKey({
      key: `create-invoice`,
    });
    return await createInvoiceUseCase(input);
  });
