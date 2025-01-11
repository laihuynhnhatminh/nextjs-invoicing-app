import { notFound } from 'next/navigation';

import Invoice from './_components/invoice';
import { getUserInvoiceByIdAction } from './actions';

type Props = Readonly<{
  params: Promise<{
    invoiceId: string;
  }>;
}>;

export default async function InvoicePage({ params }: Props) {
  const { invoiceId } = await params;
  const data = await getUserInvoiceByIdAction(invoiceId);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <Invoice invoice={data} />
    </main>
  );
}
