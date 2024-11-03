"use client"

import React, { useEffect, useState } from 'react'
import Berth from '../server/berth'
import Image from 'next/image'

import LOGO from "@/public/IMG_0863.png"

import Link from 'next/link'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { selectAtom } from '@/app/(Recoil)/(atom)/select'
import { seatCountAtom } from '@/app/(Recoil)/(atom)/seatCount'
import { totalPriceAtom } from '@/app/(Recoil)/(atom)/FirstPage'
import { noOfPassangersAtom } from '@/app/(Recoil)/(atom)/FirstPage'
import { AllSleepersAtom, LowerDoubleAtom, LowerSingleAtom, UpperDoubleAtom, UpperSingleAtom } from '@/app/(Recoil)/(atom)/AllSleepers'
import { SleeperInterface } from '../../models/Sleeper'
import axios from 'axios'
import { Button } from '../ui/button'
import mongoose from 'mongoose'
import { toast } from '../ui/use-toast'

import { useRouter } from 'next/navigation'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, NextDateAtom, NextDayAtom, NextMonthAtom, NextYearAtom, PickUpPointAtom, YearAtom } from '@/app/(Recoil)/(atom)/FirstPage'

import SosIcon from '@mui/icons-material/Sos';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import PowerIcon from '@mui/icons-material/Power';
import { SleeperDateAtom } from '@/app/(Recoil)/(atom)/SleeperDate'

const LpBooking = () => {

    const router = useRouter()

    const select = useRecoilValue(selectAtom)
    const seatCount = useRecoilValue(seatCountAtom)
    const totalPrice = useRecoilValue(totalPriceAtom)
    const noOfPassangers = useRecoilValue(noOfPassangersAtom)

    const setLowerSingle = useSetRecoilState(LowerSingleAtom)
    const setLowerDouble = useSetRecoilState(LowerDoubleAtom)
    const setUpperSingle = useSetRecoilState(UpperSingleAtom)
    const setUpperDouble = useSetRecoilState(UpperDoubleAtom)
    const [AllSleepers, setAllSleepers] = useRecoilState(AllSleepersAtom)

    const [sleeperDate, setSleeperDate] = useRecoilState(SleeperDateAtom)

    useEffect(() => {
        const fetchSleepers = async () => {
            try {
                console.log(sleeperDate)
                const res = await axios.get('/api/get-sleeper', {
                    params: {
                        sleeperDate
                    }
                })
                const All = res.data

                if (All.length > 0) {
                    setAllSleepers(All[4])
                    setLowerSingle(All[3])
                    setLowerDouble(All[1])
                    setUpperSingle(All[2])
                    setUpperDouble(All[0])
                } else {
                    console.warn('No sleepers data received or invalid format')
                }
                console.log(All)
            } catch (err) {
                console.error('Error in fetching sleepers:', err)
            }
        }
        fetchSleepers()
    }, [])

    const date = useRecoilValue(DateAtom)
    const month = useRecoilValue(MonthAtom)
    const day = useRecoilValue(DayAtom)
    const year = useRecoilValue(YearAtom)

    const nextdate = useRecoilValue(NextDateAtom)
    const nextmonth = useRecoilValue(NextMonthAtom)
    const nextday = useRecoilValue(NextDayAtom)
    const nextyear = useRecoilValue(NextYearAtom)

    const pick = useRecoilValue(PickUpPointAtom)
    const drop = useRecoilValue(DropOffPointAtom)

    const [change, setChange] = useState(false)
    const [errorOccured, setErroroccured] = useState(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const reset = async () => {
            await axios.post('/api/resetIsBooking')
        }
        reset()
    }, [])

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        const newtimeoutId = setTimeout(async () => {
            const res = await axios.post('/api/resetIsBooking')
        }, 900000)
        setTimeoutId(newtimeoutId)
    }, [change])

    const handleClick = async () => {
        const keys: string[] = Object.keys(select)
        const check = await axios.post(`/api/checkBooking`, { keys })

        if (check.data.message === "TimeOut") {
            setErroroccured(true)
            toast({
                title: "Time Out",
                description: "Time out please select the sleepers again"
            })
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId)
            } else {
                console.log('didnt worked')
            }
            router.push('/passangersdetails')
        }

    }

    return (

        <div className='hidden lg:grid w-[95%] xl:w-[90%] m-auto rounded-xl shadow-xl shadow-slate-300 bg-white grid-cols-8 mb-4'>
            <div className=' col-start-1 col-end-6 flex flex-col justify-center items-center p-4'>
                <div className='w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <div>
                            <div className='text-sm'>
                                {date} {month} {year}
                            </div>
                            <div className='text-2xl font-semibold flex justify-center'>
                                21:00
                            </div>
                        </div>
                        <div>
                            <div>
                                --7:15hrs--
                            </div>
                            <div className='text-green-600 font-bold flex justify-center'>
                                +1 Day
                            </div>
                        </div>
                        <div>
                            <div className='text-sm'>
                                {(Number(date) + 1).toString()} {nextmonth} {nextyear}
                            </div>
                            <div className='text-2xl font-semibold flex justify-center'>
                                4:15
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-4 m-3 '>
                    <div className='relative group'>
                        <div className='cursor-pointer '><SosIcon color='error' /></div>
                        <HoverText Text="Emergency Contact" />
                    </div>
                    <div className='relative group'>
                        <div className='cursor-pointer'><ShareLocationIcon color='error' /></div>
                        <HoverText Text="Live Location" />
                    </div>
                    <div className='relative group'>
                        <div className='cursor-pointer'><SanitizerIcon color='error' /></div>
                        <HoverText Text="Sanitizer" />
                    </div>
                    <div className='relative group'>
                        <div className='cursor-pointer'><PowerIcon color='error' /></div>
                        <HoverText Text="Charging Point" />
                    </div>
                </div>
                <div className='flex w-full'>
                    <div>
                        <Berth change={change} setChange={setChange} />
                    </div>
                    <div className='mx-4 flex-col items-start w-full hidden 2xl:flex'>
                        <div className='flex gap-6 items-center justify-between w-full mb-3'>
                            <div>Single Sleeper <br /> <span className='text-sm'>(For 1 passanger)</span></div>
                            <div className='h-10 w-7 border border-black rounded-lg '></div>
                        </div>
                        <div className='flex gap-6 items-center justify-between w-full mb-3'>
                            <div>Double Sleeper <br /> <span className='text-sm'>(For 2 passangers)</span></div>
                            <div className='h-10 w-10 border border-black rounded-lg '></div>
                        </div>
                        <div className='flex gap-6 items-center justify-between w-full mb-3'>
                            <div>Available</div>
                            <div className='h-10 w-7 border border-black rounded-lg '></div>
                        </div>
                        <div className='flex gap-6 items-center justify-between w-full mb-3'>
                            <div>Already Booked</div>
                            <div className='h-10 w-7 border border-black rounded-lg bg-slate-500'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' col-start-6 col-end-9 border-l-2'>
                <div className='flex justify-between w-full  shadow-md'>
                    <div className='p-4'>
                        <div className='text-2xl font-bold text-orange-600'>
                            VOLVO AC
                        </div>
                        <div>
                            Sleeper(2+1)
                        </div>
                    </div>
                    <div className='px-2 flex justify-center items-center' >
                        <Image src={LOGO} alt='LOGO' width={100} />
                    </div>
                </div>
                <div className='p-4 text-xl'>
                    <div className=' mt-4 text-lg font-medium'>
                        <LocationOnIcon color='primary' /> Pick Up Point
                    </div>
                    <div className='p-2 border-2 rounded-xl text-gray-500 text-base'>
                        {pick}
                    </div>
                    <div className=' mt-6 text-lg font-medium'>
                        <LocationOnIcon color='error' /> Drop Off Point
                    </div>
                    <div className='p-2 border-2 rounded-xl text-gray-500 text-base'>
                        {drop}
                    </div>
                </div>
                <div className='p-4 border-b-2'>
                    <div className=' text-lg font-medium'>
                        Fair Break Up
                    </div>
                    <div className='mt-2 py-2 px-4 w-full border-2 rounded-xl max-h-28 h-28 overflow-y-auto' >
                        {AllSleepers.length > 0 && AllSleepers.map((index, i) => (
                            <div key={i} className='flex justify-between'>
                                <div>
                                    {select[index.sleeperName] && index.sleeperName}
                                </div>
                                <div className=' font-semibold text-green-500'>
                                    <span>{select[index.sleeperName] && "₹"}</span>
                                    {select[index.sleeperName] && index.sleeperPrice}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='text-lg font-semibold p-4'>
                    Fair Details
                </div>
                <div className='flex justify-between items-center w-full px-4 py-1'>
                    <div>
                        {(seatCount > 0) && <div> {seatCount} Sleeper Selected </div>}
                    </div>
                    <div className='font-bold text-lg'>
                        {(seatCount > 0) && <div> ₹ {totalPrice} </div>}
                    </div>
                </div>
                <div className='flex justify-center items-center w-full mt-5'>
                    {

                        (!errorOccured) ?
                            (noOfPassangers > 0) ?

                                <Button onClick={() => { handleClick() }} className="w-3/4 bg-gradient-to-tr from-blue-900 to-indigo0-500 text-white text-xl font-medium p-3 rounded-md shadow-md transition-transform duration-200 transform  focus:outline-none">
                                    Provide Passanger Details
                                </Button>


                                :
                                <div className='w-full flex flex-col items-center'>
                                    <div>
                                        <i>
                                            (Please Select Atleast One Sleeper)
                                        </i>
                                    </div>
                                    <Button className="w-3/4 bg-gradient-to-tr from-blue-900 to-indigo0-500 opacity-50 text-white text-xl font-medium p-3 rounded-md shadow-md ">
                                        Provide Passanger Details
                                    </Button>
                                </div>
                            :
                            <h1>Time out</h1>
                    }
                </div>
            </div>
        </div >
    )
}

interface HoverTextProps {
    Text: string
}

const HoverText: React.FC<HoverTextProps> = ({ Text }) => {
    return (
        <div className="relative group">
            <div className=" text-center text-sm absolute -left-10 -bottom-12 opacity-0 group-hover:opacity-100 bg-white p-2 transition-opacity duration-300 text-gray-800 rounded-md shadow-lg">
                {Text}
            </div>
        </div>
    );
};

export default LpBooking
