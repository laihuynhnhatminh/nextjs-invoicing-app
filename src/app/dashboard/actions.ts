'use server';

import { validateUserAction } from '@/actions/auth';
import { InvoiceWithCustomer } from '@/db/schema';
import { authenticatedAction } from '@/lib/safe-action';
import { getInvoicesByUserIdUseCase } from '@/use-cases/invoices';

import { searchInvoices } from './validation';

export const getInvoicesByUserIdAction = async (): Promise<
  InvoiceWithCustomer[]
> => {
  const { userId, orgId } = await validateUserAction();
  const [data, error] = await handleSafeInvoicesByUserIdAction(userId)({
    organizationId: orgId,
  });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

const handleSafeInvoicesByUserIdAction = (userId: string) =>
  authenticatedAction(userId)
    .createServerAction()
    .input(searchInvoices)
    .handler(async ({ input: { organizationId } }) =>
      getInvoicesByUserIdUseCase(userId, organizationId),
    );
