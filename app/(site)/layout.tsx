import { SiteHeader } from '@/components/site-header';
import React from 'react';

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}

export default SiteLayout;
