"use client"
import { passangerNamesAtom } from '@/app/(Recoil)/(atom)/passangerNames'
import { bookingSleeperAtom } from '@/app/(Recoil)/(atom)/setBookingSleepers'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import whatsapp from "@/public/whatsapp.png"
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation'

const page = ({ searchParams: { amount }, }: { searchParams: { amount: string } }) => {

    const router = useRouter()

    return (
        <div className="max-w-6xl h-[52vh] mx-auto p-10 bg-white text-center border m-10 rounded-md">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Payment Failed</h1>
                <h2 className="text-2xl mb-2">Please pay again</h2>

                <div className='flex w-3/4 m-auto justify-center items-center gap-4 mt-4'>
                    <div>
                        <Button >
                            Pay Again
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default page
