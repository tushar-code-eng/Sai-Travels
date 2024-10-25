import dbConnection from "@/lib/dbConnection"
import SleeperModel from "@/models/Sleeper"

export async function GET(req: Request) {
    await dbConnection()

    try {
        const sl = await SleeperModel.find({
            isBeingBooked: true,
            isBooked: false
        })

        return Response.json({
            sl
        },{status:200})

    } catch (err) {
        return Response.json({
            success: false,
            message: "Error in finding sleepers"
        },
            { status: 500 }
        )
    }
}