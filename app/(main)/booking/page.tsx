import LpBooking from "@/components/laptopComponents/LpBooking"
import MbBooking from "@/components/mobileComponents/MbBooking"

const page = () => {

    return (
        <div h-full>
            <MbBooking />
            <LpBooking />
        </div>
    )
}

export default page
