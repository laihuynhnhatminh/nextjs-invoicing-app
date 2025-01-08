'use client';

import { ChevronDown, EllipsisIcon, Trash2Icon } from 'lucide-react';
import { useOptimistic } from 'react';

import Container from '@/components/Container';
import HydratedTimeDisplay from '@/components/hydrate-time-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvoiceSelect, StatusEnum, statusEnum } from '@/db/schema';
import { cn } from '@/lib/utils';

import {
  deleteUserInvoiceAction,
  updateUserInvoiceByIdAction,
} from '../actions';

type InvoiceProps = Readonly<{
  invoice: InvoiceSelect;
}>;

function Invoice({ invoice }: InvoiceProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (_, newStatus) => {
      return String(newStatus) as StatusEnum;
    },
  );

  const handleUpdateStatus = async (formData: FormData) => {
    const originalStatus = currentStatus;
    try {
      setCurrentStatus(formData.get('status') as StatusEnum);
      await updateUserInvoiceByIdAction(formData);
    } catch (error) {
      setCurrentStatus(originalStatus);
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="mb-8 flex w-full items-center justify-between">
        <div className="flex items-center gap-4 text-3xl font-semibold">
          Invoice {invoice.id}
          <Badge
            className={cn(
              'rounded-full capitalize',
              currentStatus === 'open' && 'bg-blue-500',
              currentStatus === 'paid' && 'bg-green-600',
              currentStatus === 'void' && 'bg-zinc-700',
              currentStatus === 'uncollectible' && 'bg-red-600',
            )}
          >
            {currentStatus}
          </Badge>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Change Status <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusEnum.enumValues.map(status => (
                <DropdownMenuItem key={status}>
                  <form action={handleUpdateStatus} className="w-full">
                    <input type="hidden" name="id" value={invoice.id} />
                    <input type="hidden" name="status" value={status} />
                    <button className="w-full text-left capitalize">
                      {status}
                    </button>
                  </form>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center gap-2"
                >
                  <span className="sr-only">More Option</span>
                  <EllipsisIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <button className="flex w-full items-center gap-2 text-left capitalize">
                      <Trash2Icon className="h-4 w-4" />
                      Delete Invoice
                    </button>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="flex flex-col items-center justify-center p-4">
              <DialogHeader>
                <DialogTitle className="mb-2 text-center">
                  Delete Invoice?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your invoice and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form action={deleteUserInvoiceAction} className="w-full">
                  <input type="hidden" name="id" value={invoice.id} />
                  <Button
                    type="submit"
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    Delete Invoice
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="mb-3 text-3xl">${(invoice.value / 100).toFixed(2)}</p>
      <p className="mb-8 text-lg">{invoice.description}</p>
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
  );
}

export default Invoice;
