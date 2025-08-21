import { SiteHeader } from '@/components/site-header';
import React from 'react';

function UserPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}

export default UserPagesLayout;
