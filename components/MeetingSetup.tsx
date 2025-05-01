'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete } : { setIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const call = useCall();

  if(!call) throw new Error("useCall should be used inside StreamCall component.");

  useEffect(() => {
    if(isMicCamToggleOn){
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Video Preview</h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'>
          <label htmlFor="" className='flex items-center justify-center gap-2 font-medium'>
            <input 
              type='checkbox'
              checked={isMicCamToggleOn}
              onChange={(e) => { setIsMicCamToggleOn(e.target.checked) }}
            />
            Join with Mic and Camera Off
          </label>
          <DeviceSettings/>
        </div>

        <Button className='rounded-md bg-blue-500 px-4py-2.5 cursor-pointer' onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetup