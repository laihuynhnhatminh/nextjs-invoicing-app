'use server';

import { InvoiceSelect } from '@/db/schema';
import { unauthenticatedAction } from '@/lib/safe-action';
import { getInvoicesUseCase } from '@/use-cases/invoices';

export const getInvoicesAction = async (): Promise<InvoiceSelect[]> => {
  const [data, error] = await handleSafeInvoiceAction();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

const handleSafeInvoiceAction = unauthenticatedAction
  .createServerAction()
  .handler(async () => getInvoicesUseCase());
