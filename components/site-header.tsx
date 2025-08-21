'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ListIcon, PlusCircleIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export function SiteHeader() {
  const pathname = usePathname();

  const isInHomePage = pathname === '/';

  return (
    <header className="border-b">
      <div className="container mx-auto h-16 flex items-center gap-4 px-4">
        <Link href="/" className="text-lg font-bold">
          ChurchFinder PH
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <SignedOut>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button variant="secondary" className="border" asChild>
              <Link href="/sign-up">Register</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            {!isInHomePage ? (
              <>
                <Button asChild>
                  <Link href="/">
                    <SearchIcon /> Find a Church
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/my-listing">
                    <ListIcon /> My Listing
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/add-church">
                  <PlusCircleIcon /> Add My Church
                </Link>
              </Button>
            )}
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
