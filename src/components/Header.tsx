import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

import Container from './Container';
import { Button } from './ui/button';

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="mb-12 mt-8">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-bold">
            <Link href={user ? '/dashboard' : '/'}>Invoicipedia</Link>
          </p>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4">
                <Button asChild>
                  <SignInButton />
                </Button>
                <Button variant={'secondary'} asChild>
                  <SignUpButton />
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </Container>
    </header>
  );
}
