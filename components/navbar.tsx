import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './mobileNav';

const Navbar = () => {
  return (
    <nav className="sm:hidden fixed top-0 z-50 flex w-full items-center justify-between bg-dark-1 px-4 py-3 bg-gray-200">
      {/* Left side - Logo or Title */}
      <div className="text-xl font-bold">Prop</div>

      {/* Right side - Auth & Menu */}
      <div className="flex items-center gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>

  );
};

export default Navbar;