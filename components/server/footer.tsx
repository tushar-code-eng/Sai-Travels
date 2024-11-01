
const Footer = () => {
    return (
        <div className="w-full bg-gradient-to-r from-[#3D3B6C] to-[#6e69d3] text-white">
            <div className="flex justify-between items-center w-full border-b p-4">
                <div className='flex flex-col justify-center items-start'>
                    <div className='text-lg font-medium '>
                        For any queries please contact
                    </div>
                    <div className="flex mt-2">
                        <div >
                            +91-981-473-7631
                            <br />
                            0172-500-7631
                        </div>
                    </div>
                </div>
                <div >
                    <div className='text-lg font-medium mb-2 flex justify-start items-center'>
                        Office Address
                    </div>
                    <div>
                        CHANDIGARH,
                        <br />
                        SCO-123 , Cabin no. 3
                        <br />
                        Sector 22 B, Chandigarh, 160022, India
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center p-1'>
                <div>
                    <span className='text-yellow-500'>©2024</span>, All Rights Reserved, <span className='font-semibold'>SAI TRAVELS</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
