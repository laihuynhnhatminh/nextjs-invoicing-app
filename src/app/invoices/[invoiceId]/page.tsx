import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { getInvoiceByIdAction } from './actions';

type Props = Readonly<{
  params: Promise<{
    invoiceId: string;
  }>;
}>;

export default async function InvoicePage({ params }: Props) {
  const { invoiceId } = await params;
  const invoice = await getInvoiceByIdAction(invoiceId);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Container>
        <div className="mb-8 flex items-center gap-4 text-3xl font-semibold">
          Invoice {invoiceId}
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
        <p className="mb-3 text-3xl">${(invoice.value / 100).toFixed(2)}</p>
        <p className="mb-8 text-lg">{invoice.description}</p>
        <h2 className="mb-4 text-lg font-bold">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Invoice ID
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Billing Name
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 text-sm font-medium">
              Billing Email
            </strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
