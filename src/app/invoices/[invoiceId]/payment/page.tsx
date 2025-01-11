import { Check, CreditCard } from 'lucide-react';
import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import HydratedTimeDisplay from '@/components/hydrate-time-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  createPaymentAction,
  getUserPublicInvoice,
  updateInvoiceSuccessStatusAction,
} from './actions';
import { PaymentStatus } from './type';

type Props = Readonly<{
  params: Promise<{
    invoiceId: string;
  }>;
  searchParams: Promise<{
    status?: PaymentStatus;
    session_id?: string;
  }>;
}>;

export default async function InvoicePage({ params, searchParams }: Props) {
  const { invoiceId } = await params;
  const { status, session_id } = await searchParams;

  const isSuccess = status === 'success';
  const isCancelled = status === 'cancelled';
  let isError = (isSuccess || isCancelled) && !session_id;

  if (isSuccess && session_id) {
    const { status: paymentStatus } = await updateInvoiceSuccessStatusAction(
      invoiceId,
      session_id,
    );

    if (paymentStatus === 'error') {
      isError = true;
    }
  }

  const invoice = await getUserPublicInvoice(invoiceId);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Container>
        {isError && (
          <p className="mb-2 w-full rounded-lg bg-red-200 px-3 py-2 text-center text-sm font-semibold text-red-900">
            Something went wrong! Please try again!
          </p>
        )}
        {isCancelled && (
          <p className="mb-2 w-full rounded-lg bg-yellow-200 px-3 py-2 text-center text-sm font-semibold">
            Payment was cancelled! Please try again!
          </p>
        )}
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="mb-8 flex w-full items-center justify-between">
              <div className="flex items-center gap-4 text-3xl font-semibold">
                Invoice {invoice.id}
                <Badge
                  className={cn(
                    'rounded-full capitalize',
                    invoice.status === 'open' && 'bg-blue-500',
                    invoice.status === 'paid' && 'bg-green-600',
                    invoice.status === 'void' && 'bg-zinc-700',
                    invoice.status === 'uncollectible' && 'bg-red-600',
                  )}
                >
                  {invoice.status}
                </Badge>
              </div>
            </div>
            <div>
              <p className="mb-3 text-3xl">
                ${(invoice.value / 100).toFixed(2)}
              </p>
              <p className="mb-8 text-lg">{invoice.description}</p>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="mb-4 text-lg font-bold">Manage Invoice</h2>
            {invoice.status === 'open' && (
              <form action={createPaymentAction}>
                <input type="hidden" name="id" value={invoice.id} />
                <Button className="font-bolds flex gap-2 bg-green-700">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </Button>
              </form>
            )}
            {invoice.status === 'paid' && (
              <div className="flex items-center gap-2 text-xl font-bold">
                <Check className="h-7 w-7 rounded-full bg-green-500 p-1 text-white" />
                Invoice paid
              </div>
            )}
          </div>
        </div>
        <h2 className="mb-4 text-lg font-bold">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Invoice Date
            </strong>
            <HydratedTimeDisplay date={invoice.createTs} />
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Billing Name
            </strong>
            <span>{invoice.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
