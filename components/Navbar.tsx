import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav 
      className="sm:hidden fixed top-0 z-50 flex w-full items-center justify-between bg-dark-1 px-4 py-3"
      style={{ backgroundColor: "#162332" }}
    >
      <div className="flex items-center gap-3 ml-auto">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>

  );
};

export default Navbar;