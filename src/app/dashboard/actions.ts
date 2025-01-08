'use server';

import { validateUserAction } from '@/actions/auth';
import { InvoiceSelect } from '@/db/schema';
import { authenticatedAction } from '@/lib/safe-action';
import { getInvoicesByUserIdUseCase } from '@/use-cases/invoices';

export const getInvoicesByUserIdAction = async (): Promise<InvoiceSelect[]> => {
  const userId = await validateUserAction();
  const [data, error] = await handleSafeInvoicesByUserIdAction(userId)();

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

const handleSafeInvoicesByUserIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .handler(async () => getInvoicesByUserIdUseCase(userId));
