
"use client"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import LOGO from "@/public/logo.png"

import jsonObject from "@/Data.json"

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useState } from "react";

import Link from "next/link";
import { useRecoilValue } from "recoil";
import { selectAtom } from "@/app/(Recoil)/(atom)/select";
import { seatCountAtom } from "@/app/(Recoil)/(atom)/seatCount";
import { totalPriceAtom } from "@/app/(Recoil)/(atom)/FirstPage";
import { noOfPassangersAtom } from "@/app/(Recoil)/(atom)/FirstPage";

interface dataObjectTypes {
    [key: string]: number
}

interface dataObject {
    Price: dataObjectTypes
}

const TotalAmountMb = () => {

    const { Price }: dataObject = jsonObject

    const select = useRecoilValue(selectAtom)
    const seatCount = useRecoilValue(seatCountAtom)
    const totalprice = useRecoilValue(totalPriceAtom)
    const noOfPassangers = useRecoilValue(noOfPassangersAtom)

    let sl = Object.keys(select)

    const [pricebreakup, setPricebreakup] = useState(false)

    const searchedParams = useSearchParams()

    const getDate = searchedParams.get("date")
    const getDay = searchedParams.get("day")
    const getMonth = searchedParams.get("month")
    const getYear = searchedParams.get("year")

    const fairBreakUpHandle = () => {
        setPricebreakup(!pricebreakup)
    }

    return (
        <>
            <div className={pricebreakup ? "p-4 border-b-2 bg-white absolute bottom-full w-full" : "hidden"}>
                <div className='text-lg font-medium'>
                    Fair Break Up
                </div>
                <div className='mt-2 py-2 px-4 w-full rounded-xl ' >
                    {sl.map((index, i) => (
                        <div key={i} className='flex justify-between'>
                            <div>
                                {select[index] && index}
                            </div>
                            <div className=' font-semibold text-green-500'>
                                <span>{select[index] && "₹"}</span>
                                {select[index] && Price[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white w-full text-black border-t-2  border-gray-400 shadow-2xl shadow-black">
                <div className="flex justify-between items-center p-2 border-b-2 border-gray-300 ">
                    <div>
                        <div className="text-2xl font-bold text-yellow-500">
                            <Image src={LOGO} alt="LOGO" width={80} />
                        </div>
                    </div>
                    <div className="text-lg text-black ">
                        {getDay}, {getDate}  {getMonth}
                    </div>
                </div>
                <div className='flex justify-between items-center w-full p-2'>
                    <div className="flex">
                        {(seatCount > 0) &&
                            <div className="flex justify-start items-center gap-2">
                                <div>
                                    {seatCount} Sleeper Selected
                                </div>
                            </div>
                        }
                    </div>
                    <div className=' flex flex-col justify-center items-center font-bold text-lg gap-2'>
                        {(seatCount > 0) && <div> ₹ {totalprice} </div>}
                    </div>
                </div>
                <div className="px-2 flex justify-start items-center">
                    <button className="text-sm" onClick={fairBreakUpHandle} >
                        See Fair Break Up <span> <InfoOutlinedIcon fontSize="small" /> </span>
                    </button>
                </div>
                <div className="w-full flex justify-center items-center mt-1 p-3">
                    <Link className='w-full flex justify-center' href={{
                        pathname: '/passangersdetails',
                        query: {
                            number: noOfPassangers
                        }
                    }
                    }>
                        <button className="p-2 w-[90%] bg-yellow-500 text-xl rounded-xl">Provide Passanger Details</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TotalAmountMb

