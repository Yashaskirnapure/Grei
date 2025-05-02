'use client'

import { links } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import MobileNav from './MobileNav';
import {
    SignedIn,
    UserButton,
  } from '@clerk/nextjs'
import {
    Home,
    CalendarDays,
    History,
    Video,
    Users,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    Home: Home,
    Upcoming: CalendarDays,
    Previous: History,
    Recordings: Video,
    'Meeting Room': Users,
};

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section
        className="sticky left-0 top-0 flex h-screen w-fit flex-col px-6 py-3 max-sm:hidden lg:w-[264px] text-white"
        style={{ backgroundColor: "#162332" }}
    >
        <div className='flex justify-between'>
            <Link href='/' className='flex items-center gap-1'>
                <p className='text-[30px] font-extrabold max-lg:hidden'>Grei</p>
            </Link>
            <div className='flex items-center justify-center'>
                <SignedIn>
                    <UserButton afterSignOutUrl='/sign-in' />
                </SignedIn>
                <MobileNav />
            </div>
        </div>
        <div className='flex flex-1 flex-col gap-2 '>
            <MobileNav />
            {  
                links.map((link) => {
                    const isActive = pathname === link.route;
                    const Icon = iconMap[link.label];

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                                'flex gap-4 items-center p-2 rounded-lg justify-start',
                                { 'text-white': isActive }
                            )}
                            style={{
                                backgroundColor: isActive ? '#2a3a48' : 'transparent'
                            }}
                        >

                            <Icon size={20} />
                            <span className="text-lg font-semibold max-lg:hidden">{link.label}</span>
                        </Link>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Sidebar;