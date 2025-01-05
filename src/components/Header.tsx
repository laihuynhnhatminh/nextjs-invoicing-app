import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';

import Container from './Container';

export default function Header() {
  return (
    <header className="mb-12 mt-8">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <p className="text-2xl font-bold">
            <Link href="/dashboard">Invoicipedia</Link>
          </p>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </div>
        </div>
      </Container>
    </header>
  );
}
