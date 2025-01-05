import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/Container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { getInvoicesAction } from './actions';

export default async function DashboardPage() {
  const invoices = await getInvoicesAction();

  return (
    <main>
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <Button variant="ghost" asChild>
            <Link href="/invoices/new" className="inline-flex gap-2">
              <CirclePlus className="h-4 w-4" />
              <span>Create Invoice</span>
            </Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Customer</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4 text-center">Status</TableHead>
              <TableHead className="p-4 text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell className="p-0 text-left">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="block w-full p-4 font-semibold"
                  >
                    {new Date(invoice.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-left">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="block w-full p-4 font-semibold"
                  >
                    Minh Lai
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-left">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="block w-full p-4"
                  >
                    nhatminhwork1996@gmail.com
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="block w-full p-4"
                  >
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
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-right">
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="block w-full p-4 font-semibold"
                  >
                    ${(invoice.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
