import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import mongoose from "mongoose";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const {keys} = await req.json()

        const yes = await SleeperModel.find({
            sleeperName:{$in:keys},
            isBeingBooked:true
        }).exec()

        if(yes.length<1){
            return Response.json({
                success:false,
                message:"TimeOut"
            },{status:200})
        }

        return Response.json({
            success: true
        },{status:200})
    } catch (err) {
        return Response.json(
            {
                success: true,
                message: err
            }
        )
    }
}