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
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="mx-auto my-12 flex h-full max-w-4xl flex-col justify-center gap-6 xl:max-w-5xl">
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
          <TableRow>
            <TableCell className="p-4 text-left font-medium">
              <span className="font-semibold"> 10/31/2024</span>
            </TableCell>
            <TableCell className="p-4 text-left">
              <span className="font-semibold">Minh Lai</span>
            </TableCell>
            <TableCell className="p-4 text-left">
              <span>nhatminhwork1996@gmail.com</span>
            </TableCell>
            <TableCell className="p-4 text-center">
              <Badge className="rounded-full">Open</Badge>
            </TableCell>
            <TableCell className="p-4 text-right">
              <span className="font-semibold">$100.00</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
