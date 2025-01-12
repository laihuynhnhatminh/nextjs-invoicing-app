'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';

import { validateUserAction } from '@/actions/auth';
import { InvoicePaymentEmail } from '@/emails/invoice-created';
import { authenticatedAction } from '@/lib/safe-action';
import { getCustomerUseCase } from '@/use-cases/customers';
import { createInvoiceUseCase } from '@/use-cases/invoices';
import { validateStringAsNumber } from '@/utils/validation';

import { createInvoiceSchema } from './validations';

const resend = new Resend(process.env.RESEND_API_KEY);

export const createInvoiceAction = async (
  formData: FormData,
): Promise<void> => {
  const { userId, orgId } = await validateUserAction();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const value = validateStringAsNumber(formData.get('value') as string);
  const description = formData.get('description') as string;

  const [data, error] = await handleSafeCreateInvoiceAction(userId)({
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
    await resend.emails.send({
      from: 'Himemiya Taiyou <no-reply@himemiya.dev>',
      to: email,
      subject: `You have a new Invoice - Invoice ${data}`,
      react: InvoicePaymentEmail({ invoiceId: data }),
    });

    redirect(`/invoices/${data}`);
  }
};

const handleSafeCreateInvoiceAction = (userId: string) =>
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
