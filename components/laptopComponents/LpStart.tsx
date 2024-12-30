"use client"
import Image from "next/image"
import querryImage from '@/public/querry.png'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LpBox from "./LpBox";
import MbStart from "../mobileComponents/MbStart";

import home1 from '@/public/home-1.svg'
import home2 from '@/public/home-2.svg'
import home3 from '@/public/home-3.svg'
import home4 from '@/public/home-4.svg'
import home5 from '@/public/home-5.svg'

interface LpStartProps {
    targetRef: React.RefObject<HTMLDivElement>
}

const LpStart = ({ targetRef }: LpStartProps) => {

    return (
        <div className="w-full mt-20" >
            <div className="w-[85%] mx-auto rounded-md " ref={targetRef}>
                <div className="">
                    <div className="hidden lg:block">
                        <LpBox />
                    </div>
                    <div className="lg:hidden block">
                        <MbStart />
                    </div>
                    <div className="flex justify-center items-center">
                        Image
                    </div>
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] mx-auto mt-4 p-4" >
                <h1 className="text-4xl text-center font-semibold my-4 ">Why Choose SAI TRAVELS?</h1>
                <div className="flex flex-col gap-10">
                    <div className="px-10 bg-slate-200 rounded-xl text-center md:flex md:justify-between md:items-center w-full p-2">
                        <div className="  md:w-1/2 md:text-left ">
                            Enjoy a restful journey in our spacious sleeper buses. Our well-maintained and clean buses offer comfortable sleeping arrangements, ensuring you arrive at your destination refreshed.
                        </div>
                        <div className="my-8 flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home1} alt="Animate1"></Image>
                        </div>
                    </div>
                    <div className="px-10 bg-slate-200 rounded-xl text-center md:flex md:justify-between md:items-center w-full p-2 ">
                        <div className=" hidden my-8 md:flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home2} alt="Animate1"></Image>
                        </div>
                        <div className=" md:w-1/2 md:text-right">
                            We pride ourselves on punctuality and reliability. Our buses depart and arrive on time, so you can plan your trip with confidence.
                        </div>
                        <div className="md:hidden my-8 flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home2} alt="Animate1"></Image>
                        </div>
                    </div>
                    <div className="px-10 bg-slate-200 rounded-xl text-center md:flex md:justify-between md:items-center w-full p-2 ">
                        <div className=" md:w-1/2 md:text-left">
                            Travel in comfort without breaking the bank. We offer competitive pricing for all our services, making it easier for you to enjoy a hassle-free journey.
                        </div>
                        <div className="my-8 flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home3} alt="Animate1"></Image>
                        </div>
                    </div>
                    <div className="px-10 bg-slate-200 rounded-xl text-center md:flex md:justify-between md:items-center w-full p-2 ">
                        <div className="hidden my-8 md:flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home4} alt="Animate1"></Image>
                        </div>
                        <div className=" md:w-1/2 md:text-right">
                            Your safety is our top priority. Our buses are equipped with the latest safety features and are regularly serviced to ensure a smooth and secure ride.
                        </div>
                        <div className="md:hidden my-8 flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home4} alt="Animate1"></Image>
                        </div>
                    </div>
                    <div className="px-10 bg-slate-200 rounded-xl text-center md:flex md:justify-between md:items-center w-full p-2">
                        <div className="md:w-1/2 md:text-left">
                            Booking your ticket is simple and hassle-free with our user-friendly website. Choose your seat, make payments, and get ready for a comfortable journey.
                        </div>
                        <div className="my-8  flex items-center justify-center bg-yellow-400 rounded-full border-8 border-black border-double">
                            <Image src={home5} alt="Animate1"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LpStart
