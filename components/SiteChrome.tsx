'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import ScrollReveal from './ScrollReveal';
import RequestInfoModal from './RequestInfoModal';
import AccessibilityWidget from './AccessibilityWidget';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" style={{ paddingTop: '72px' }}>{children}</main>
      <ScrollReveal />
      <RequestInfoModal />
      <AccessibilityWidget />
    </>
  );
}
