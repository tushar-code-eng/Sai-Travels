import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";

export async function POST(req: Request) {
    await dbConnection()

    try {

        const sl = await SleeperModel.find({ isBeingBooked:true })

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