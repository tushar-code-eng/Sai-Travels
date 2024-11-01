import React from 'react'
import Load from '@/public/loaderAnimation.json'
import  Lottie  from 'lottie-react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Lottie className='w-24' animationData={Load} loop={true} />
    </div>
  )
}

export default Loading
