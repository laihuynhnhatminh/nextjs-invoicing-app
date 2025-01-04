import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-6 text-center">
      <h1 className="text-5xl font-bold">Invoices</h1>
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
