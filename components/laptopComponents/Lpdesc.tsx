"use client"
import Image from "next/image"
import busIamge from "@/public/img.png"

interface LpdescProps {
    scrollToTarget:() => void
}

const Lpdesc = ({scrollToTarget}:LpdescProps) => {

    return (
        <div className="flex">
            <div className="flex flex-col items-center w-1/3 p-6 ml-8 mt-10">
                <div >
                    <div className="flex text-7xl font-semibold text-yellow-500">
                        SAI <br /> TRAVELS
                    </div>
                    <div className="text-2xl w-full text-cyan-600">
                        Daily Bus Service
                    </div>
                    <div className="mt-10 w-[90%] text-Gray-700 text-lg">
                        Experience daily comfort and convenience with our premium bus service from Manali to Chandigarh. Enjoy reliable transportation  and exceptional amenities. Book now for a hassle-free journey.
                    </div>
                </div>
                <div className="flex justify-center items-start mt-20">
                    <button onClick={scrollToTarget} className= " bg-yellow-500 p-5 px-10 text-lg font-bold rounded-xl text-blueGray-800 transition-transform ease-in-out duration-200 transform border-0 hover:scale-110">BOOK NOW</button>
                </div>
            </div>
            {/* <div className="justify-center flex items-center"> */}
                <div className="">
                    <Image src={busIamge} alt="Image" width={900} height={600}/>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Lpdesc
