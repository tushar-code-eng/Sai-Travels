"use client"

import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useForm, SubmitHandler } from "react-hook-form";

import Link from 'next/link'
import { Button } from '@react-email/components'
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, NextDateAtom, NextDayAtom, NextMonthAtom, NextYearAtom, PickUpPointAtom, YearAtom } from '@/app/(Recoil)/(atom)/FirstPage';
import { loadAtom } from '@/app/(Recoil)/(atom)/Loading';

interface IFormInput {
    PickUpPoint: String;
    DropOffPoint: String;
    date: Date;
}

const LpBox = () => {

    const [load,setLoad] = useRecoilState(loadAtom)

    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    const [tom, setTom] = useState(false)

    const date = useRecoilValue(DateAtom)
    const month = useRecoilValue(MonthAtom)
    const day = useRecoilValue(DayAtom)
    const year = useRecoilValue(YearAtom)

    const nextdate = useRecoilValue(NextDateAtom)
    const nextmonth = useRecoilValue(NextMonthAtom)
    const nextday = useRecoilValue(NextDayAtom)
    const nextyear = useRecoilValue(NextYearAtom)

    const [pick, setPick] = useRecoilState(PickUpPointAtom)
    const [drop, setDrop] = useRecoilState(DropOffPointAtom)

    const handleClick = () => {
        setTom(!tom)
        let n;
        if (tom) {
            n = 0
        } else {
            n = 1
        }
    }

    

    return (
        <div>
            <div className="rounded-xl shadow-xl w-[88%] m-auto mb-10">
                <div className='p-3 flex justify-between gap-2'>
                    <div className='hover:border rounded-xl p-2'>
                        <div className='text-xs'>
                            <b>Chandigarh</b>
                        </div>
                        <div className='overflow-hidden flex justify-start items-center '>
                            <DropdownMenu >
                                <DropdownMenuTrigger>
                                    <div className='w-[18rem] '>
                                        <div className={`text-base w-full text-left ${pick === "Departure Location..." ? "text-slate-400 " : "text-black "}? `}>
                                            {pick}
                                        </div>
                                        <DropdownMenuContent className='w-full'>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full text-slate-400' onClick={() => setPick("Departure Location...")}>Departure Location...</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Sector 22B Chandiagrh")}>Sector 22B Chandiagrh</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Place 2")}>Place 2</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Place 3")}>Place 3</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </div>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='hover:border rounded-xl p-2'>
                        <div className='text-xs'>
                            <b>Jammu</b>
                        </div>
                        <div className='overflow-hidden flex justify-start items-center'>
                            <DropdownMenu >
                                <DropdownMenuTrigger>
                                    <div className='w-[18rem] '>
                                        <div className={`text-base w-full text-left ${drop === "Arival Location..." ? "text-slate-400" : "text-black"} `}>
                                            {drop}
                                        </div>
                                        <DropdownMenuContent className='w-full'>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full text-slate-400' onClick={() => setDrop("Arival Location...")}>Arival Location...</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Somewhere in Jammu")}>Somewhere in Jammu</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Place 2")}>Place 2</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Place 3")}>Place 3</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </div>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className='hover:border rounded-xl items-center justify-center flex ' >
                        <div>
                            <div className='text-xs '>
                                <b>Booking Date</b>
                            </div>
                            <div className=''>
                                {!tom ? `${day}, ${month.slice(0, 3)} ${date}` : `${nextday}, ${nextmonth.slice(0, 3)} ${nextdate}`}
                            </div>
                        </div>
                    </div>
                    <div onClick={() => handleClick()} className={`border-2 bg-gray-200 text-base cursor-pointer rounded-xl flex items-center justify-center font-semibold w-[9%]`}>
                        {tom ? "Today" : "Tomorrow"}
                    </div>
                    <div className='flex items-center'>
                        <Link href={{ pathname: '/booking' }}>
                            <button onClick={()=>{setLoad(true)}} className='py-3 px-12 bg-blue-600 rounded-xl text-xl font-semibold cursor-pointer transition-transform ease-in-out duration-200 transform hover:bg-blue-500 text-white'>
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default LpBox
