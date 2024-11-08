"use client"

import Berth from "../server/berth"
import TotalAmountMb from "./TotalAmountMb"
import jsonObject from "@/Data.json"
import { useRouter, useSearchParams } from 'next/navigation'
import SleeperInfo from "../server/sleeperInfo"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { seatCountAtom } from "@/app/(Recoil)/(atom)/seatCount"
import { selectAtom } from "@/app/(Recoil)/(atom)/select"
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, NextDateAtom, NextDayAtom, NextMonthAtom, NextYearAtom, noOfPassangersAtom, PickUpPointAtom, totalPriceAtom, YearAtom } from "@/app/(Recoil)/(atom)/FirstPage"
import { AllSleepersAtom, LowerDoubleAtom, LowerSingleAtom, UpperDoubleAtom, UpperSingleAtom } from "@/app/(Recoil)/(atom)/AllSleepers"
import { useEffect, useState } from "react"
import axios from "axios"


import SosIcon from '@mui/icons-material/Sos';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import PowerIcon from '@mui/icons-material/Power';
import { SleeperDateAtom } from "@/app/(Recoil)/(atom)/SleeperDate"
import { toast } from "../ui/use-toast"

interface selection {
    [key: string]: boolean
}

interface MbBookingParams {
    noOfPassangers: number
    setNoOfPassangers: React.Dispatch<React.SetStateAction<number>>
}

const MbBooking = () => {

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

    const sleeperDate = useRecoilState(SleeperDateAtom)

    useEffect(() => {
        const fetchSleepers = async () => {
            try {
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

    return (
        <div className='lg:hidden w-full'>
            <div className="p-4 w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm">
                            {date} {month} {year}
                        </div>
                        <div className="text-3xl font-semibold">
                            21:00
                        </div>
                        <div>
                            Chandigarh
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            --7:15hrs--
                        </div>
                        <div className="text-green-600 font-bold">
                            +1 Day
                        </div>
                    </div>
                    <div>
                        <div className="text-sm">
                            {nextdate} {nextmonth} {nextyear}
                        </div>
                        <div className="text-3xl font-semibold flex justify-end">
                            4:15
                        </div>
                        <div className="flex justify-end">
                            Jammu
                        </div>
                    </div>
                </div>
                <div className=' w-full m-auto'>
                    <div className="flex justify-center items-center gap-3 w-full m-auto">
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
                </div>
                <div className="overflow-x-auto mt-4 flex justify-start items-center sm:justify-center">
                    <div>
                        <Berth change={change} setChange={setChange} />
                    </div>
                </div>
                <div>
                    <SleeperInfo />
                </div>
            </div>
            <div className="sticky z-10 bottom-0 w-full">
                {(seatCount > 0) && <TotalAmountMb />}
            </div>
        </div>
    )
}

export default MbBooking

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
