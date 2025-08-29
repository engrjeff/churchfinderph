import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto h-16 flex items-center gap-4 px-4">
        <Link href="/" className="text-lg font-bold">
          ChurchFinder PH
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <SignedOut>
            <Button size="sm" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" variant="secondary" className="border" asChild>
              <Link href="/add-church">Add Your Church</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button size="sm" asChild>
              <Link href="/my-listing">
                <ListIcon /> My Listing
              </Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
