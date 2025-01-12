'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import Stripe from 'stripe';

import { getOrigin } from '@/actions/header';
import { PublicInvoiceWithCustomer } from '@/db/schema';
import { InvoiceReceiptEmail } from '@/emails/invoice-receipt';
import { unauthenticatedAction } from '@/lib/safe-action';
import {
  getPublicInvoiceByIdUseCase,
  getPublicInvoiceUseCase,
  updateInvoiceSuccessPaymentUseCase,
} from '@/use-cases/invoices';
import { validateStringAsNumber } from '@/utils/validation';

import { searchInvoice, updateInvoiceStatus } from './validations';

const stripe = new Stripe(String(process.env.STRIPE_SECRET));
const resend = new Resend(process.env.RESEND_API_KEY);

export const getUserPublicInvoice = async (
  id: string,
): Promise<PublicInvoiceWithCustomer | null> => {
  const invoiceId = validateStringAsNumber(id);

  const [data, error] = await handleSafeGetPublicByIdInvoice()({
    id: invoiceId,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const createPaymentAction = async (
  formData: FormData,
): Promise<void> => {
  const invoiceId = validateStringAsNumber(formData.get('id') as string);

  const [data, error] = await handleSafeGetPublicInvoice()({
    id: invoiceId,
  });

  if (error) {
    console.error(error);
    return;
  }

  const requestOrigin = await getOrigin();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product: 'prod_RZEqmBfqlFmtmB',
          unit_amount: data.value,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${requestOrigin}/invoices/${invoiceId}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${requestOrigin}/invoices/${invoiceId}/payment?status=cancelled&session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.url) {
    throw new Error('Failed to create payment session');
  }

  redirect(session.url);
};

export const updateInvoiceSuccessStatusAction = async (
  id: string,
  sessionId: string,
): Promise<{
  status: 'success' | 'cancelled' | 'error';
}> => {
  const invoiceId = validateStringAsNumber(id);
  const { payment_status, amount_total, created } =
    await stripe.checkout.sessions.retrieve(sessionId);

  if (payment_status !== 'paid' || !amount_total || !created) {
    return { status: 'error' };
  }

  const [_, error] = await handleSafeUpdateInvoiceSuccessPayment()({
    id: invoiceId,
  });

  if (error) {
    console.error(error);
    return { status: 'error' };
  }

  const [data, getError] = await handleSafeGetPublicByIdInvoice()({
    id: invoiceId,
  });

  if (getError || !data) {
    console.error(getError);
    return { status: 'error' };
  }

  await resend.emails.send({
    from: 'Himemiya Taiyou <no-reply@himemiya.dev>',
    to: data.email,
    subject: `Invoice payment - Invoice ${invoiceId}`,
    react: InvoiceReceiptEmail({
      invoiceId: invoiceId,
      name: data.name,
      value: amount_total,
      date: new Date(created).toLocaleDateString(),
    }),
  });

  return { status: 'success' };
};

const handleSafeGetPublicByIdInvoice = () =>
  unauthenticatedAction
    .createServerAction()
    .input(searchInvoice)
    .handler(async ({ input: { id } }) => getPublicInvoiceByIdUseCase(id));

const handleSafeGetPublicInvoice = () =>
  unauthenticatedAction
    .createServerAction()
    .input(searchInvoice)
    .handler(async ({ input: { id } }) => getPublicInvoiceUseCase(id));

const handleSafeUpdateInvoiceSuccessPayment = () =>
  unauthenticatedAction
    .createServerAction()
    .input(updateInvoiceStatus)
    .handler(async ({ input: { id } }) =>
      updateInvoiceSuccessPaymentUseCase(id),
    );
