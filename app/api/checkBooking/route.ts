import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const { keys, sleeperDate } = await req.json()

        const A = await SleeperModel.find()
        let yes
        if (sleeperDate === A[0].date) {
            console.log("1st")
            yes = await SleeperModel.find({
                sleeperName: { $in: keys },
                isBeingBooked: true
            }).exec()
        } else {
            console.log("2nd")
            yes = await SleeperAvailabilityTomorrowModel.find({
                sleeperName: { $in: keys },
                isBeingBooked: true
            }).exec()
        }

        if (yes.length < 1) {
            return Response.json({
                success: false,
                message: "TimeOut"
            }, { status: 200 })
        }

        return Response.json({
            success: true
        }, { status: 200 })
    } catch (err) {
        return Response.json(
            {
                success: true,
                message: err
            }
        )
    }
}