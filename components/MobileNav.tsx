'use client'

import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";
import { links } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
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

import { Menu } from 'lucide-react';
import Link from 'next/link';

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Menu 
                    size={24}   
                    className='cursor-pointer sm:hidden'
                    color='white'
                />
            </SheetTrigger>
            <SheetContent 
                side='left'
                style={{ backgroundColor: "#162332", color: "white" }}
            >
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                </SheetHeader>
                <Link href='/' className='flex items-center gap-1'>
                    <p className='text-[26px] font-extrabold max-sm:hidden'>Prop</p>
                </Link>
                <div className='flex h-[calc(100vh-72px)] flex-1 flex-col gap-2'>
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-2 pt-10'>
                            {
                                links.map((link) => {
                                    const isActive = pathname === link.route;
                                    const Icon = iconMap[link.label];

                                    return (
                                        <Link 
                                            href={link.route}
                                            key={link.label}
                                            className={cn('flex gap-4 items-center p-2 rounded-lg justify-start mx-5',
                                                { 'text-white': isActive }
                                                )}
                                                style={{
                                backgroundColor: isActive ? '#2a3a48' : 'transparent'
                            }}
                                        >
                                            <Icon size={20} />
                                            <span className="text-lg font-semibold">{link.label}</span>
                                        </Link>
                                    )
                                })
                            }
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav;