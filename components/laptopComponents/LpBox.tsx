"use client"

import React, { useEffect, useState } from 'react'
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, NextDateAtom, NextDayAtom, NextMonthAtom, NextYearAtom, PickUpPointAtom, YearAtom } from '@/app/(Recoil)/(atom)/FirstPage';
import { loadAtom } from '@/app/(Recoil)/(atom)/Loading';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SleeperDateAtom } from '@/app/(Recoil)/(atom)/SleeperDate';

interface IFormInput {
    PickUpPoint: String;
    DropOffPoint: String;
    date: Date;
}

const LpBox = () => {

    const [load, setLoad] = useRecoilState(loadAtom)

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

    const [sleeperDate, setSleeperDate] = useRecoilState(SleeperDateAtom)

    useEffect(() => {
        const currentDate = new Date();
        setSleeperDate(currentDate)
    }, [])
    const handleClick = () => {
        setTom(!tom)
        let n;
        const currentDate = new Date();
        if (tom) {
            setSleeperDate(currentDate)
            n = 0
        } else {
            const tomorrow = new Date(currentDate);
            tomorrow.setDate(currentDate.getDate() + 1);
            setSleeperDate(tomorrow)
            n = 1
        }
    }

    return (
        <div>
            <div className="rounded-xl border-2 border-slate-600 shadow-xl w-[90%] m-auto mb-10">
                <div className='p-3 flex justify-between'>
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <div className='border rounded-xl p-2 flex flex-col items-start justify-center xl:min-w-80'>
                                <div className='text-xs'>
                                    <b>Chandigarh</b>
                                </div>
                                <div className='w-full overflow-hidden flex justify-start items-center '>
                                    <div className='w-full '>
                                        <div className=' w-full flex items-center justify-between'>
                                            <div className={`text-base w-full text-left ${pick === "Departure Location..." ? "text-slate-400 " : "text-black "}? `}>
                                                {pick}
                                            </div>
                                            <div>
                                                <KeyboardArrowDownIcon />
                                            </div>
                                        </div>
                                        <DropdownMenuContent className='w-full'>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full text-slate-400' onClick={() => setPick("Departure Location...")}>Departure Location...</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Sector 22B Chandiagrh")}>Sector 22B, Chandiagrh</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Kharar, Bus Stand")}>Kharar, Bus Stand</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Sector 25 Maharana Pratap hostel")}>Sector 25, Maharana Pratap hostel</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <div className='border rounded-xl  p-2 flex flex-col items-start justify-center xl:min-w-80'>
                                <div className='text-xs'>
                                    <b>Jammu</b>
                                </div>
                                <div className='w-full overflow-hidden flex justify-start items-center'>
                                    <div className='w-full'>
                                        <div className=' w-full flex items-center justify-between'>
                                            <div className={`text-base w-full text-left ${drop === "Arival Location..." ? "text-slate-400" : "text-black"} `}>
                                                {drop}
                                            </div>
                                            <div>
                                                <KeyboardArrowDownIcon />
                                            </div>
                                        </div>
                                        <DropdownMenuContent className='w-full'>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full text-slate-400' onClick={() => setDrop("Arival Location...")}>Arival Location...</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Kunjwani Bypass, Jammu")}>Kunjwani Bypass, Jammu</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Satwari Chownk")}>Satwari Chownk</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setDrop("Trikuta Complex BC Road Jammu")}>Trikuta Complex BC Road Jammu</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                    <div className='hover:border rounded-xl items-center justify-center flex p-2' >
                        <div>
                            <div className='text-xs '>
                                <b>Booking Date</b>
                            </div>
                            <div className=''>
                                {!tom ? `${day}, ${month.slice(0, 3)} ${date}` : `${nextday}, ${nextmonth.slice(0, 3)} ${nextdate}`}
                            </div>
                        </div>
                    </div>
                    <div onClick={() => handleClick()} className={`border-2 bg-gray-200 text-base p-2 cursor-pointer rounded-xl flex items-center justify-center font-semibold`}>
                        {tom ? "Today" : "Tomorrow"}
                    </div>
                    <div className='flex items-center'>
                        <Link href={{ pathname: '/booking' }}>
                            <button onClick={() => { setLoad(true); console.log(sleeperDate) }} className="relative overflow-hidden transition-colors duration-500 ease-in-out group py-3 px-12 rounded-xl text-xl font-semibold cursor-pointer text-black border-2 border-transparent group-hover:border-transparent">
                                <span className="relative z-10">Continue</span>
                                <span className="absolute -inset-1 bg-gradient-to-tr from-rose-300 to-pink-400 transform -translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-0"></span>
                                <span className="absolute inset-0 border-2 rounded-xl border-pink-400 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default LpBox
