import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";

export async function GET(req: Request) {
    await dbConnection()
    try {
        const AllSleepers = await SleeperModel.find()

        return Response.json(AllSleepers)
    } catch (err) {
        return Response.json(
            {
                success:true,
                message:"Error in fetching sleeper details"
            }

        )
    }
}