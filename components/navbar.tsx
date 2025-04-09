import React from 'react';
import Link from 'next/link';
import MobileNav from './mobileNav';

const Navbar = () => {
  return (
    <section className='flex fixed z-50 w-full px-6 py-5 lg:px-10 bg-gray-200'>
        <Link href='/' className='flex items-center gap-1'>
            <p className='text-[26px] font-extrabold max-sm:hidden'>Prop</p>
        </Link>
        <MobileNav/>
    </section>
  )
}

export default Navbar;