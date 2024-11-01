"use client"

import { Button } from '@/components/ui/button'

import React from 'react'

const Page = ({ searchParams: { amount }, }: { searchParams: { amount: string } }) => {

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

export default Page
