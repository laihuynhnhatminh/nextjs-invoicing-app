'use server';

import { InvoiceSelect } from '@/db/schema';
import { unauthenticatedAction } from '@/lib/safe-action';
import { getInvoiceByIdUseCase } from '@/use-cases/invoices';

import { searchInvoice } from './validations';

export const getInvoiceByIdAction = async (
  id: string,
): Promise<InvoiceSelect | null> => {
  const invoiceId = parseInt(id, 10);

  if (Number.isNaN(invoiceId)) {
    throw new Error('Invalid invoice ID');
  }

  const [data, error] = await handleSafeInvoiceByIdAction({ id: invoiceId });

  if (error) {
    console.error(error);
  }

  return data;
};

const handleSafeInvoiceByIdAction = unauthenticatedAction
  .createServerAction()
  .input(searchInvoice)
  .handler(async ({ input: { id } }) => getInvoiceByIdUseCase(id));
