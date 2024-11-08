import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const { value,sleeperDate } = await req.json()

        const A = await SleeperModel.find()
        let sl;

        if (sleeperDate === A[0].date) {
            console.log("1st")
            sl = await SleeperModel.findOne({ sleeperName: value })
        } else {
            console.log("2nd")
            sl = await SleeperAvailabilityTomorrowModel.findOne({ sleeperName: value })
        }

        if (sl) {
            sl.isBeingBooked = !sl.isBeingBooked
            await sl.save()
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