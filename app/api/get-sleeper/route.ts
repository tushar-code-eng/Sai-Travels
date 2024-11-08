export const dynamic = 'force-dynamic'

import dbConnection from "@/lib/dbConnection";
import SleeperModel, { SleeperInterface } from "@/models/Sleeper";
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability";
// import SleeperModel from "@/models/Sleeper";
import SleeperAvailabilityModel from "@/models/SleeperAvailability";
// import { NextApiRequest } from "next";

export async function GET(req:Request) {
    await dbConnection()

    const dateIncoming = req.url?.split("=")[1]

    try {
        if (dateIncoming) {
            const date = new Date(dateIncoming).getDate().toString()
            let AllSleepers
            const A = await SleeperModel.find()

            if (date === A[0].date) {
                console.log("1st")
                AllSleepers = await SleeperModel.find()
            } else {
                console.log("2nd")
                AllSleepers = await SleeperAvailabilityModel.find()
            }

            const SortedSleepers: SleeperInterface[][] = [[], [], [], [],[]];

            for (let i = 0; i < AllSleepers.length; i++) {
                const sleeperNamePrefix = AllSleepers[i].sleeperName.split("-")[0];
                if (sleeperNamePrefix === "A") {
                    SortedSleepers[0].push(AllSleepers[i]);
                    SortedSleepers[4].push(AllSleepers[i]);
                } else if (sleeperNamePrefix === "B") {
                    SortedSleepers[1].push(AllSleepers[i]);
                    SortedSleepers[4].push(AllSleepers[i]);
                } else if (sleeperNamePrefix === "C") {
                    SortedSleepers[2].push(AllSleepers[i]);
                    SortedSleepers[4].push(AllSleepers[i]);
                } else if (sleeperNamePrefix === "D") {
                    SortedSleepers[3].push(AllSleepers[i]);
                    SortedSleepers[4].push(AllSleepers[i]);
                }
            }

            for (let i = 0; i < SortedSleepers.length; i++) {
                SortedSleepers[i].sort((a, b) => {
                    if (Number(a.sleeperName.split("-")[1]) < Number(b.sleeperName.split("-")[1])) return -1;
                    if (Number(a.sleeperName.split("-")[1]) > Number(b.sleeperName.split("-")[1])) return 1;
                    return 0;
                });
            }

            return Response.json(SortedSleepers)

        } else {

            return Response.json(
                {
                    success: false,
                    message: "Error in fetching URL"
                }

            )
        }

    } catch (err) {
        return Response.json(
            {
                success: false,
                message: "Error in fetching sleeper details"
            }

        )
    }
}