"use client"
import { greenAtom } from "@/app/(Recoil)/(atom)/green"
import { noOfPassangersAtom } from "@/app/(Recoil)/(atom)/FirstPage"
// import { noOfPassangersAtom } from "@/app/(Recoil)/(atom)/noOfPassangers"
import { seatCountAtom } from "@/app/(Recoil)/(atom)/seatCount"
import { selectAtom } from "@/app/(Recoil)/(atom)/select"
import { totalPriceAtom } from "@/app/(Recoil)/(atom)/FirstPage"
import { SleeperInterface } from "@/models/Sleeper"
import axios from "axios"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { SleeperDateAtom } from "@/app/(Recoil)/(atom)/SleeperDate"

interface SleeperProps {
    n: SleeperInterface
    change: boolean
    setChange: React.Dispatch<React.SetStateAction<boolean>>
}

const SleeperDouble = ({ n, change, setChange }: SleeperProps) => {

    const [select, setSelect] = useRecoilState(selectAtom)
    const [green, setGreen] = useRecoilState(greenAtom)
    const setSeatCount = useSetRecoilState(seatCountAtom)
    const setTotalPrice = useSetRecoilState(totalPriceAtom)
    const setNoOfPassangers = useSetRecoilState(noOfPassangersAtom)

    const sleeperDate = useRecoilValue(SleeperDateAtom)

    const handleClick = async (value: string) => {
        setChange(!change)
        const res = await axios.post('/api/setIsBooking', {
            value,
            sleeperDate: sleeperDate
        })
        console.log(res)

        setGreen((prevState) => ({
            ...prevState,
            [value]: !prevState[value]
        }))
        setSelect(prevState => ({
            ...prevState,
            [value]: !prevState[value]
        }))
        if (select[value] === true) {
            //decreasing seat Count
            setSeatCount((s: number) => s - 1)
            setTotalPrice((prev: number) => prev - n.sleeperPrice)
            setNoOfPassangers((prev: number) => prev - 1)
        } else {
            //Increasing seat count
            setSeatCount((s: number) => s + 1)
            setTotalPrice((prev: number) => prev + n.sleeperPrice)
            setNoOfPassangers((prev: number) => prev + 1)
        }
    }

    return (
        <div className="w-20 relative flex justify-center">
            <div className={`h-16 w-16 rounded-lg flex justify-center items-center mt-3 cursor-pointer transition-transform ease-in-out duration-200 transform border-0 hover:scale-120
            ${green[n.sleeperName] ? " bg-green-600 text-white " : "h-16 w-11 bg-slate-100 "}
            ${n.isBeingBooked || n.isBooked && "pointer-events-none opacity-50"}
            `} onClick={() => handleClick(n.sleeperName)}>
                {n.sleeperName}
            </div>
            <div className={`absolute top-[40%] bg-slate-800 text-white font-semibold rounded p-1 
            ${green[n.sleeperName] ? "right-full" : " hidden left-full"}
            `}>
                ₹{n.sleeperPrice}
            </div>
        </div>
    )
}

export default SleeperDouble
