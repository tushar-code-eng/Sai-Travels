import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const { value } = await req.json()
        const sl = await SleeperModel.findOne({ sleeperName: value })

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