import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import SleeperAvailabilityTomorrowModel from "@/models/SleeperAvailability";

const allSleepers: (string | number)[][] = [
    ["C-1", 700],
    ["C-2", 700],
    ["C-3", 700],
    ["C-4", 700],
    ["C-5", 700],
    ["C-6", 700],
    ["D-1", 700],
    ["D-2", 700],
    ["D-3", 700],
    ["D-4", 700],
    ["D-5", 700],
    ["D-6", 700],
    ["A-1-2", 1200],
    ["A-3-4", 1200],
    ["A-5-6", 1200],
    ["A-7-8", 1200],
    ["A-9-10", 1200],
    ["A-11-12", 1200],
    ["B-1-2", 1300],
    ["B-3-4", 1300],
    ["B-5-6", 1300],
    ["B-7-8", 1300],
    ["B-9-10", 1300],
    ["B-11-12", 1300]
]

export async function POST(req: Request) {
    dbConnection()

    try {
        const whichDay = 1;
        const today = new Date()

        const date = new Date(today)
        date.setDate(today.getDate() + whichDay)
        const dateToAdd = date.getDate()

        if (whichDay == 1) {
            for (let i in allSleepers) {
                const newAvailability = new SleeperAvailabilityTomorrowModel({
                    date: dateToAdd,
                    sleeperName: allSleepers[i][0],
                    sleeperPrice: allSleepers[i][1],
                });
                newAvailability.save()
            }

        } else {
            for (let i in allSleepers) {
                const newAvailability = new SleeperModel({
                    date: dateToAdd,
                    sleeperName: allSleepers[i][0],
                    sleeperPrice: allSleepers[i][1],
                });
                newAvailability.save()
            }
        }

        return Response.json({
            success: true,
            message: "Successfull initalization of Sleepers"
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in sleeper initalization"
        })

    }
}