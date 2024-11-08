import dbConnection from "@/lib/dbConnection"
import SleeperModel, { SleeperInterface } from "@/models/Sleeper"
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability"

export async function GET(req: Request) {
    await dbConnection()

    const dateIncoming = req.url?.split("=")[1]
    let sl: SleeperInterface[] = []

    try {
        if (dateIncoming) {
            const date = new Date(dateIncoming).getDate().toString()
            const A = await SleeperModel.find()

            if (date === A[0].date) {
                console.log("1st")
                sl = await SleeperModel.find({
                    isBeingBooked: true,
                    isBooked: false
                })
            } else {
                console.log("2nd")
                sl = await SleeperAvailabilityTomorrowModel.find({
                    isBeingBooked: true,
                    isBooked: false
                })
            }
        }

        return Response.json({
            sl
        }, { status: 200 })

    } catch (err) {
        return Response.json({
            success: false,
            message: "Error in finding sleepers"
        },
            { status: 500 }
        )
    }
}