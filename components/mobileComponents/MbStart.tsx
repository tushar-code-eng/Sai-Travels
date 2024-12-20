"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MbStart = () => {
    const allMonths: string[] = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const alldays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const d = new Date()
    const temp = new Date()
    const nextDate = temp.getDate()

    const [fulldate, setFulldate] = useState<Date>()
    const [date, setDate] = useState<number>(d.getDate())
    const [month, setMonth] = useState<string>(allMonths[d.getMonth()])
    const [day, setDay] = useState(alldays[d.getDay()])
    const [year, setYear] = useState(d.getFullYear())

    temp.setDate(nextDate + 1)

    const [nextdate, setNextdate] = useState<number>(temp.getDate())
    const [nextmonth, setNextmonth] = useState<string>(allMonths[temp.getMonth()])
    const [nextday, setNextday] = useState(alldays[temp.getDay()])
    const [nextyear, setNextyear] = useState(temp.getFullYear())

    const [pick, setPick] = useState<string>("Sector 22B Chandiagrh")
    const [drop, setDrop] = useState<string>("Place 1")

    const [shade, setShade] = useState<boolean[]>([true, ...Array(4).fill(false)])

    const today: number = d.getDate()
    const dates: number[] = []
    const days: number[] = []
    const months: number[] = []
    const years: number[] = []

    for (let i = 0; i < 5; i++) {
        d.setDate(today + i)
        dates[i] = d.getDate()
        days[i] = d.getDay()
        months[i] = d.getMonth()
        years[i] = d.getFullYear()
    }

    const shading = (n: number) => {
        setShade(prevState => {
            const newArray = [...prevState]
            for (let i = 0; i < 5; i++) {
                newArray[i] = false
            }
            newArray[n] = true
            return newArray
        })
    }

    const handleClick = (n: number) => {
        setDate(dates[n])
        setMonth(allMonths[months[n]])
        setDay(alldays[days[n]])
        setYear(years[n])

        shading(n);
    }

    return (
        <div >
            <div className='w-full rounded-md border-2 border-slate-300'>
                <div className=' flex justify-between p-2 border-b-2 shadow-sm'>
                    <div>
                        <h1 className='text-orange-600 text-3xl font-bold'>VOLVO AC</h1>
                        <p className='text-sm text-left ml-1'>sleeper(2+1)</p>
                    </div>
                    <div>
                        <p className='text-sm '>Starting At</p>
                        <h1 className='text-center text-3xl font-bold'>₹ 700</h1>
                    </div>
                </div>
                <div className='w-full p-3'>
                    <div className='w-full text-xl'>
                        <div className=' text-base'>
                            <b>CHANDIGARH</b>(Pick Up)
                        </div>
                        <div className='overflow-hidden w-full flex justify-start border-2 items-center rounded-xl'>
                            <DropdownMenu >
                                <DropdownMenuTrigger className='w-full'>
                                    <div className='flex justify-between items-center text-base p-2 w-full '>
                                        <div className='w-full flex items-center justify-between'>
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
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Sector 22B Chandiagrh")}>Sector 22B Chandiagrh</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Manimajra")}>Manimajra</div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className='cursor-pointer text-base transition-transform ease-in-out duration-200 transform hover:scale-110 w-full' onClick={() => setPick("Sector 25")}>Sector 25</div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </div>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className='w-full px-3'>
                    <div className='w-full text-xl'>
                        <div className='text-base'>
                            <b>JAMMU</b>(Drop Off)
                        </div>
                        <div className='overflow-hidden w-full flex justify-start border-2 items-center rounded-xl'>
                            <DropdownMenu >
                                <DropdownMenuTrigger className='w-full'>
                                    <div className='flex justify-between items-center text-base p-2 w-full'>
                                        <div className='w-full flex items-center justify-between'>
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
                </div>
                <div className='px-4 my-2'>
                    <div>Select departure</div>
                    <div className='flex justify-between'>
                        <div className='flex gap-3 mt-3'>
                            <div className='flex flex-col justify-center items-center cursor-pointer'>
                                <div className={'rounded-3xl w-10 h-10  flex flex-col justify-center items-center text-xl'} onClick={() => handleClick(0)}>
                                    <div className={shade[0] === true ? "bg-gradient-to-tr from-rose-300 to-pink-400 text-white w-10 h-10 rounded-3xl flex justify-center items-center" : "bg-slate-100 transition-transform ease-in-out duration-100 transform border-0 hover:scale-150"} >
                                        {dates[0]}
                                    </div>
                                </div>
                                <div>
                                    {alldays[days[0]]}
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center cursor-pointer'>
                                <div className={'rounded-3xl w-10 h-10  flex flex-col justify-center items-center text-xl'} onClick={() => handleClick(1)}>
                                    <div className={shade[1] === true ? "bg-gradient-to-tr from-rose-300 to-pink-400 text-white w-10 h-10 rounded-3xl flex justify-center items-center" : "bg-slate-100 transition-transform ease-in-out duration-100 transform border-0 hover:scale-150"} >
                                        {dates[1]}
                                    </div>
                                </div>
                                <div>
                                    {alldays[days[1]]}
                                </div>
                            </div>


                        </div>
                        <div className='w-28 flex justify-end items-center px-2'>
                            <div className='text-2xl font-semibold '>
                                {month}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Link href={{
                        pathname: '/booking'
                    }}>
                        <button className='bg-gradient-to-tr from-orange-500 to-orange-700 text-white hover:font-semibold py-2 px-7 m-3 mb-4 bg-white border-2 font-bold rounded-xl text-xl cursor-pointer transition-transform ease-in-out duration-200 transform hover:scale-110'>
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default MbStart
