import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';

const SignUpPage = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
        <div className='m-10'><SignUp /></div>
    </main>
  )
}

export default SignUpPage