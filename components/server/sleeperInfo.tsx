
const SleeperInfo = () => {
    return (
        <div >
            <div className="text-center p-4 mt-2 text-xl font-bold ">
                Know Your Sleeper Types
            </div>
            <div className="bg-slate-300 p-3 rounded-lg md:bg-slate-200">
                <div className="flex justify-between items-center text-lg font-semibold">
                    <div>Type</div>
                    <div>Sleeper</div>
                </div>
                <div className=" border-black border mt-2"></div>
                <div className="flex justify-between items-center h-24">
                    <div>Single Sleeper <br /> (For 1 passanger) </div>
                    <div className=" flex justify-center w-11 h-16 bg-white rounded-lg"></div>
                </div>
                <div className="flex justify-between items-center h-24">
                    <div>Double Sleeper  <br /> (For 2 passangers) </div>
                    <div className=" flex justify-center w-16 h-16 bg-white rounded-lg"></div>
                </div>
                <div className="flex justify-between items-center h-24">
                    <div>Available</div>
                    <div className=" flex justify-center w-11 h-16 bg-white rounded-lg"></div>
                </div>
                <div className="flex justify-between items-center h-24">
                    <div>Already Booked</div>
                    <div className=" flex justify-center w-11 h-16 bg-slate-400 pointer-events-none rounded-lg"></div>
                </div>
            </div>
        </div>
    )
}

export default SleeperInfo
