'use client';

import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="relative w-full font-semibold" type="submit">
      <span className={pending ? 'text-transparent' : ''}>Create Invoice</span>
      {pending && (
        <span className="absolute flex h-full w-full items-center justify-center text-gray-400">
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </span>
      )}
    </Button>
  );
}

export { SubmitButton };
