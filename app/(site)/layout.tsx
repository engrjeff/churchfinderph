import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import React from 'react';

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export default SiteLayout;
