import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const {sleeperDate} = await req.json()

        const A = await SleeperModel.find()
        let sl;

        if (sleeperDate === A[0].date) {
            console.log("1st")
            sl = await SleeperModel.find({ isBeingBooked:true })
        } else {
            console.log("2nd")
            sl = await SleeperAvailabilityTomorrowModel.find({ isBeingBooked:true })
        }

        if (sl.length > 0) {
            for(let i=0;i<sl.length;i++){
                sl[i].isBeingBooked = false
                await sl[i].save()
            }
        } else {
            return Response.json({
                success: false,
            })
        }

        return Response.json({
            success: true,
        })
    } catch (err) {

        return Response.json(
            {
                success: true,
                message: err
            }
        )
    }
}