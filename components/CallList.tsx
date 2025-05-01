'use client';

import useGetCalls from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import MeetingCard from './MeetingCard';

const CallList = ({ type } : { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, recordings, isLoading } = useGetCalls();
  const router = useRouter();

  const getCalls = () => {
    switch(type){
      case 'ended':
        return endedCalls;
      case 'upcoming':
        return upcomingCalls;
      case 'recordings':
        return recordings;
      default:
        return [];
        break;
    }
  }

  const getNoCallsMessage = () => {
    switch(type){
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
      default:
        return [];
    }
  }

  const calls = getCalls();
  const message = getNoCallsMessage();

  return (
    <div className='grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? 
        calls.map((meeting : Call | CallRecording) => (<MeetingCard/>)) : 
        (<h1 className='text-white'>{message}</h1>)}
    </div>
  )
}

export default CallList