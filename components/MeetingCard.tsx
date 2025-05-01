import React from 'react'

const MeetingCard = () => {
  return (
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
  )
}

export default MeetingCard