'use client';

import { ArrowLeft } from 'lucide-react';
import NextError from 'next/error';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Props = Readonly<{
  error: Error;
}>;

export default function ErrorBoundary({ error }: Props) {
  return (
    <main className="mx-auto my-12 min-h-svh max-w-4xl justify-center xl:max-w-5xl">
      <NextError statusCode={500} withDarkMode={true} title={error.message} />
      <Button asChild>
        <Link href="/" className="inline-flex gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Go back home</span>
        </Link>
      </Button>
    </main>
  );
}
