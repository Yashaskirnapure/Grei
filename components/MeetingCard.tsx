"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { avatarImages } from "@/constants";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) => {
    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[#162332] px-5 py-8 mb-3">
            <article className="flex flex-col gap-5">
                <Image src={icon} alt="upcoming" width={28} height={28} />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                        <p className="text-base font-normal text-white">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex justify-center items-center absolute left-[136px] size-10 rounded-full border-[5px] text-white border-blue-900 bg-blue-950">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2 mr-10">
                        <Button onClick={handleClick} className="rounded bg-blue-500 px-6 cursor-pointer">
                            {buttonIcon && (
                                <Image src={buttonIcon} alt="feature" width={20} height={20} />
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast("Link Copied");
                            }}
                            className="bg-blue-500 px-6 cursor-pointer"
                        >
                            <Image
                                src="/icons/copy.svg"
                                alt="feature"
                                width={20}
                                height={20}
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;