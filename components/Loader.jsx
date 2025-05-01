import React from 'react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className='flex justify-center h-screen w-full' style={{ backgroundColor: "#35404c" }}>
        <Image src={'/icons/loading-circle.svg'} height={50} width={50} alt='Loading..'/>
    </div>
  )
}

export default Loader