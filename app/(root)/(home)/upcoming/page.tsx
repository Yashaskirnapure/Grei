import React from 'react';
import CallList from '@/components/CallList';

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-blue-950'>
      <h1 className='text-3xl font-bold text-white'>Upcoming</h1>
      <CallList type='upcoming'/>
    </section>
  )
}

export default Upcoming