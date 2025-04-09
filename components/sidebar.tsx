'use client'

import { links } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import MobileNav from './mobileNav';

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
    <section className='sticky left-0 top-0 flex h-screen w-fit 
    flex-col justify-between p-6 pt-20 max-sm:hidden lg:w-[264px] bg-gray-100'>
        <div className='flex flex-1 flex-col gap-2'>
            <MobileNav />
            {  
                links.map((link) => {
                    const isActive = pathname === link.route;
                    const Icon = iconMap[link.label];

                    console.log(link.label);
                    return (
                        <Link 
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-2 rounded-lg justify-start',
                                {
                                    'bg-blue-100': isActive
                                }
                            )}
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