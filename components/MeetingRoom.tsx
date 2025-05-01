import { 
  PaginatedGridLayout,
  SpeakerLayout,
  CallParticipantsList,
  CallControls,
  CallStatsButton,
  useCallStateHooks,
  CallingState
} from '@stream-io/video-react-sdk';
import { LayoutList, Speaker, Users } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseSearchParams } from '@stream-io/video-react-sdk/dist/src/components/Search/hooks';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'left' | 'right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const [layout, setLayout] = useState('left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if(callingState !== CallingState.JOINED) return <Loader/>;

  const CallLayout = () => {
    switch(layout){
      case 'grid':
        return <PaginatedGridLayout />
      case 'left':
        return <SpeakerLayout participantsBarPosition="right"/>
      case 'right':
        return <SpeakerLayout participantsBarPosition="left" />
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout/>
        </div>
        <div className={
          cn('h-[calc(100vh-86px)] hidden ml-2',
          { 'block': showParticipants, 'hidden': !showParticipants })}
        >
          <CallParticipantsList onClose={() => {setShowParticipants(false)}}/>
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList className='text-white'/>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-[#13353d] bg-[#19232d] text-white'>
            {['Grid', 'Left', 'Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button 
          onClick={() => {setShowParticipants((prev) => !prev)}}
          className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
        >
          <Users />
        </button>

        { !isPersonalRoom && <EndCallButton/> }
      </div>
    </section>
  )
}

export default MeetingRoom