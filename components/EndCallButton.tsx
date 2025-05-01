'use client';

import React from 'react'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const router = useRouter();
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isOwner = localParticipant && 
        call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if(!isOwner) return null;

  return (
    <Button onClick={
        async() => { 
            await call.endCall();
            router.push('/');
        }}
        className='bg-red-500 hover:bg-red-400 cursor-pointer'
    >
        End Call
    </Button>
  )
}

export default EndCallButton