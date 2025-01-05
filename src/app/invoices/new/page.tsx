'use client';

import Form from 'next/form';
import { SyntheticEvent, useState } from 'react';

import Container from '@/components/Container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { SubmitButton } from './_components/submit-button';
import { createInvoiceAction } from './actions';

type FormState = 'ready' | 'pending';

export default function NewInvoicePage() {
  const [state, setState] = useState<FormState>('ready');

  const handleOnSubmit = (event: SyntheticEvent) => {
    if (state === 'pending') {
      event.preventDefault();
      return;
    }

    setState('pending');
  };

  return (
    <main>
      <Container>
        <div className="mb-4 flex justify-between">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
        </div>
        <Form
          className="grid max-w-xs gap-4"
          action={createInvoiceAction}
          onSubmit={handleOnSubmit}
        >
          <div>
            <Label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Billing Name
            </Label>
            <Input name="name" id="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Billing Email
            </Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="value" className="mb-2 block text-sm font-semibold">
              Value
            </Label>
            <Input name="value" id="value" type="number" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Description
            </Label>
            <Textarea name="description" id="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
