'use client'
import React from 'react';
import Image from 'next/image';
import MeetingModal from './MeetingModal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { toast, Toaster } from 'sonner';
import { Description } from '@radix-ui/react-dialog';
import { Tornado } from 'lucide-react';

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const router = useRouter();
    const user = useUser();
    const client = useStreamVideoClient();
    const [callDetails, setCallDetails] = useState<Call>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });

    const createMeeting = async () => {
        if(!client || !user) return;

        try{
            if(!values.dateTime){
                toast("Please select date and time");
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if(!call) throw new Error("Failed to create call");
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "New instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description: description
                    }
                }
            })

            setCallDetails(call);
            if(!values.description){
                router.push(`/meeting/${call.id}`);
            }

            toast("Meeting created");
        }catch(err){
            toast("Failed to create meeting");
            console.log(err);
        }
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <div 
            className='bg-orange-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260] rounded-[14px] cursor-pointer'
            onClick={() => { setMeetingState('isInstantMeeting') }}
        >
            <div className='flex justify-center align-center bg-gray-600 opacity-50 h-12 w-12 rounded-[10px]'>
                <Image src={'/icons/add-meeting.svg'} alt='add meeting' width={25} height={25}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>New Meeting</h1>
                <p className='font-normal'>Start an instant meeting</p>
            </div>
        </div>

        <div 
            className='bg-blue-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260] rounded-[14px] cursor-pointer'
            onClick={() => { setMeetingState('isJoiningMeeting') }}
        >
            <div className='flex justify-center align-center bg-gray-600 opacity-50 h-12 w-12 rounded-[10px]'>
                <Image src={'/icons/join-meeting.svg'} alt='join meeting' width={25} height={25}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>Join Meeting</h1>
                <p className='font-normal'>Via Invitation Link</p>
            </div>
        </div>

        <div 
            className='bg-purple-600 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260] rounded-[14px] cursor-pointer'
            onClick={() => { setMeetingState('isScheduleMeeting') }}
        >
            <div className='flex justify-center align-center bg-gray-600 opacity-50 h-12 w-12 rounded-[10px]'>
                <Image src={'/icons/schedule.svg'} alt='schedule' width={25} height={25}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>Schedule Meeting</h1>
                <p className='font-normal'>Plan your meeting</p>
            </div>
        </div>

        <div 
            className='bg-yellow-500 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260] rounded-[14px] cursor-pointer'
            onClick={() => { router.push('/recordings') }}
        >
            <div className='flex justify-center align-center bg-gray-600 opacity-50 h-12 w-12 rounded-[10px]'>
                <Image src={'/icons/recordings.svg'} alt='recordings' width={25} height={25}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>View Recordings</h1>
                <p className='font-normal'>Manage recordings</p>
            </div>
        </div>

        <MeetingModal
            isOpen = {meetingState === 'isInstantMeeting'}
            onClose = {() => { setMeetingState(undefined) }}
            title = "Start an instant meeting"
            className = "text-center"
            buttonText = "Start Meeting"
            handleClick = {createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList;