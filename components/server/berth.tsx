import Image from "next/image"
import Wheel from "@/public/steering-wheel.png"
import { SleeperInterface } from "../../models/Sleeper"

import SleeperDouble from "./sleeperDouble"
import { useRecoilState, useRecoilValue } from "recoil"
import Sleepers from "./sleeper"
import { AllSleepersAtom, LowerDoubleAtom, LowerSingleAtom, UpperDoubleAtom, UpperSingleAtom } from "@/app/(Recoil)/(atom)/AllSleepers"

import axios from "axios"
import { useMemo } from "react"

interface BerthProps {
    sleeperLoading: boolean
    change: boolean
    setChange: React.Dispatch<React.SetStateAction<boolean>>
}

const Berth = ({ sleeperLoading, change, setChange }: BerthProps) => {

    const [LowerSingle, setLowerSingle] = useRecoilState(LowerSingleAtom)
    const [LowerDouble, setLowerDouble] = useRecoilState(LowerDoubleAtom)
    const [UpperSingle, setUpperSingle] = useRecoilState(UpperSingleAtom)
    const [UpperDouble, setUpperDouble] = useRecoilState(UpperDoubleAtom)
    const [AllSleepers, setAllSleepers] = useRecoilState(AllSleepersAtom)

    return (

        <>
            <style>
                {`
          @keyframes shimmerVertical {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100%);
            }
          }
          .shimmer-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(255, 255, 255, 0.8) 50%,
              transparent 100%
            );
            animation: shimmerVertical 1.5s infinite;
          }
        `}
            </style> 
            {
                sleeperLoading ?
                    <div className="flex w-[580px] justify-between gap-4">
                        <div className="relative h-[550px] w-[280px]  overflow-hidden bg-gray-200">
                            <div className="shimmer-effect h-full w-full" />
                        </div>
                        <div className="relative h-[550px] w-[280px] overflow-hidden bg-gray-200">
                            <div className="shimmer-effect h-full w-full" />
                        </div>
                    </div >
                    :
                    <div className="flex w-[580px] justify-between gap-4">
                        <div className={`upper bg-gray-200 w-[280px] rounded-xl ${sleeperLoading ? " opacity-0" : " opacity-100"}`}>
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
                                        <Sleepers sleeperLoading={sleeperLoading} change={change} setChange={setChange} key={index} n={n} />
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
                                            <Sleepers sleeperLoading={sleeperLoading} change={change} setChange={setChange} key={index} n={n} />
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
            }
        </>
    )
}

export default Berth
