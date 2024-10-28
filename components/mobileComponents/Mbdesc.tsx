import Image from "next/image"
import busImage from "@/public/busImage.jpg"


const Mbdesc = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="m-2 flex justify-center items-center">
                <Image src={busImage} width={600} alt="Image" />
            </div>
            <div className="text-center text-2xl my-5 px-10">
                Experience daily comfort and convenience with our premium bus service from Chandigarh to Manali. Enjoy reliable transportation  and exceptional amenities. Book now for a hassle-free journey.
            </div>
            <div>
                <button className="bg-yellow-500 py-4 px-8 text-xl font-semibold rounded-xl">Book Now</button>
            </div>
        </div>
    )
}

export default Mbdesc
