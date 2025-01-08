import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="mx-auto my-12 max-w-4xl content-center justify-center xl:max-w-5xl">
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold">Resources not found!</h1>
      </div>

      <Button asChild>
        <Link href="/" className="inline-flex gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Go back home</span>
        </Link>
      </Button>
    </main>
  );
}
