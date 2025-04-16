import React from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

const page = ({ params } : { params: {id: string }}) => {
  const { user, isLoaded } = useUser();
  const [ isSetupComplete, setIsSetupComplete ] = useState(false);

  return (
    <main className='h-screen w-full'>
      <StreamCall call={}>
        <StreamTheme>
          { !isSetupComplete ? ( "Meeting Setup" ) : ( "Meeting Room" ) }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default page