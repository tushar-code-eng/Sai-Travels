import Image from "next/image"
import Wheel from "@/public/steering-wheel.png"
import { SleeperInterface } from "../../models/Sleeper"

import SleeperDouble from "./sleeperDouble"
import { useRecoilState, useRecoilValue } from "recoil"
import Sleepers from "./sleeper"
import { AllSleepersAtom, LowerDoubleAtom, LowerSingleAtom, UpperDoubleAtom, UpperSingleAtom } from "@/app/(Recoil)/(atom)/AllSleepers"
// import React, { useEffect, useState } from "react"
import axios from "axios"
import { useMemo } from "react"

interface BerthProps {
    change: boolean
    setChange: React.Dispatch<React.SetStateAction<boolean>>
    // timeoutId: NodeJS.Timeout | undefined
}

const Berth =({ change, setChange }: BerthProps) => {

    const [LowerSingle, setLowerSingle] = useRecoilState(LowerSingleAtom)
    const [LowerDouble, setLowerDouble] = useRecoilState(LowerDoubleAtom)
    const [UpperSingle, setUpperSingle] = useRecoilState(UpperSingleAtom)
    const [UpperDouble, setUpperDouble] = useRecoilState(UpperDoubleAtom)
    const [AllSleepers, setAllSleepers] = useRecoilState(AllSleepersAtom)

    return (
        <div className="flex w-[580px] justify-between gap-4">
            <div className="upper bg-gray-200 w-[280px] rounded-xl">
                <div className="text-center text-xl font-semibold p-2">
                    Upper Deck
                </div>
                <div className=" w-14 float-right px-3">
                    <Image src={Wheel} alt="wheel" />
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-1/2 p-3 text-left">
                        <div className="text-lg">
                            Single
                        </div>
                        {UpperSingle.map((n: SleeperInterface, index) => (
                            <Sleepers change={change} setChange={setChange} key={index} n={n} />
                        ))}
                    </div>
                    <div className="w-1/3 p-3 text-right" >
                        <div className=" text-lg text-center">
                            Double
                        </div>
                        {UpperDouble.map((n: SleeperInterface, index) => (
                            <SleeperDouble change={change} setChange={setChange} key={index} n={n} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="upper bg-gray-200 w-[280px] rounded-xl">
                <div className="text-center text-xl font-semibold p-2">
                    Lower Deck
                </div>
                <div className=" w-14 float-right px-3">
                    <Image src={Wheel} alt="wheel" />
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-1/2 p-3 text-left">
                        <div className="text-lg">
                            Single
                        </div>
                        <div>
                            {LowerSingle.map((n: SleeperInterface, index) => (
                                <Sleepers change={change} setChange={setChange} key={index} n={n} />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/3 p-3 text-right" >
                        <div className="text-lg text-center">
                            Double
                        </div>
                        {LowerDouble.map((n: SleeperInterface, index) => (
                            <SleeperDouble change={change} setChange={setChange} key={index} n={n} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Berth
