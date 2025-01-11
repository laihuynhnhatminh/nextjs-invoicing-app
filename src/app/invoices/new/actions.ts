'use server';

import { redirect } from 'next/navigation';

import { validateUserAction } from '@/actions/auth';
import { authenticatedAction } from '@/lib/safe-action';
import { getCustomerUseCase } from '@/use-cases/customers';
import { createInvoiceUseCase } from '@/use-cases/invoices';
import { validateStringAsNumber } from '@/utils/validation';

import { createInvoiceSchema } from './validations';

export const createInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const { userId, orgId } = await validateUserAction();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const value = validateStringAsNumber(formData.get('value') as string);
  const description = formData.get('description') as string;

  const [data, error] = await handleSafeInvoiceAction(userId)({
    value,
    description,
    userId,
    name,
    email,
    organizationId: orgId,
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
    .handler(async ({ input }) => {
      const { name, email } = input;
      const customer = await getCustomerUseCase({
        userId,
        name,
        email,
        organizationId: input.organizationId || null,
      });
      const invoiceId = await createInvoiceUseCase({
        ...input,
        userId,
        customerId: customer.id,
        organizationId: input.organizationId || null,
      });

      return invoiceId;
    });
