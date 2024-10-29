export const dynamic = 'force-dynamic'

import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";

export async function GET(req: Request) {
    console.log("hitting the api")
    await dbConnection()
    try {
        const AllSleepers = await SleeperModel.find()

        return Response.json(AllSleepers)
    } catch (err) {
        return Response.json(
            {
                success:false,
                message:"Error in fetching sleeper details"
            }

        )
    }
}