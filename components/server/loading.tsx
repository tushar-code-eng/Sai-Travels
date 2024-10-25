import React from 'react'
import Load from '@/public/loaderAnimation.json'
import  Lottie  from 'lottie-react';

const Loading = () => {
  return (
    <div className='w-20'>
      <Lottie className='' animationData={Load} loop={true} />
    </div>
  )
}

export default Loading
