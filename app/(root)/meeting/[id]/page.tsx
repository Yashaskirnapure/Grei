'use client'

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Page = ({ params } : { params: Promise<{id: string }>}) => {
  const { isLoaded } = useUser();
  const [ isSetupComplete, setIsSetupComplete ] = useState(false);
  const { id } = React.use(params);
  const { call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className='h-screen w-full' style={{ backgroundColor: "#35404c" }}>
       <StreamCall call={call}>
        <StreamTheme>
          { !isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete}/> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Page