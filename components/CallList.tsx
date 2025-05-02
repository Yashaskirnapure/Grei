'use client';

import useGetCalls from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CallList = ({ type } : { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCalls = async() =>{
      try{
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting?.queryRecordings()) ?? []
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings)
  
        setRecordings(recordings);
      }catch(err){
        toast('Failed to fetch recordings. Please try again later.');
        console.log(err);
      }
    }

    if(type === 'recordings') fetchCalls();
  },[type, callRecordings])

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

  if(isLoading) return <Loader/>

  return (
    <div className='grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? 
        calls.map((meeting : Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id}
          icon={
            type==='upcoming' ? '/icons/upcoming.svg' :
                type==='recordings' ? '/icons/recordings.svg' : '/icons/previous.svg'
          }
          title={
            (meeting as Call).state?.custom?.description ||
            (meeting as CallRecording).filename?.substring(0, 20) ||
            'Personal Meeting'
          }
          date={
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString()
          }
          isPreviousMeeting={type === 'ended'}
          buttonIcon={type === 'recordings' ? '/icons/play.svg' : undefined}
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          handleClick={
              type === 'recordings'
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
          }
          link={
              type === 'recordings'
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
          }
        />
      )) : (<h1 className='text-white'>{message}</h1>)}
    </div>
  )
}

export default CallList