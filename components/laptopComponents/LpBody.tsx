"use client"
import React, { useRef } from 'react'
import Lpdesc from './Lpdesc'
import LpStart from './LpStart'

const LpBody = () => {

  const targetRef = useRef<HTMLDivElement>(null)

  const scrollToTarget = () => {
    console.log('wow')
    if (targetRef.current) {
      const yPos = targetRef.current.offsetTop - 100;
      window.scrollTo({
        top: yPos,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className='hidden sm:block'>
      <Lpdesc scrollToTarget={scrollToTarget} />
      <LpStart targetRef={targetRef} />
    </div>
  )
}

export default LpBody