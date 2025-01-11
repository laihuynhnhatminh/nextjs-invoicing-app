import {
  OrganizationSwitcher,
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
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              <Link href={user ? '/dashboard' : '/'}>Invoicipedia</Link>
            </p>
            <span className="text-xl text-slate-400">/</span>
            <span className="-ml-2">
              <SignedIn>
                <OrganizationSwitcher
                  afterCreateOrganizationUrl={'/dashboard'}
                />
              </SignedIn>
            </span>
          </div>
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
