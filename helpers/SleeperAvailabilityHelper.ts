import SleeperModel from "../models/Sleeper";
import SleeperAvailabilityModel from "../models/SleeperAvailability";
import dbConnection from "@/lib/dbConnection";

export async function initializeAvailabilityForTodayAndTomorrow() {
    await dbConnection()

    const sleepers = await SleeperModel.find();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    for (const date of [today, tomorrow]) {
        for (const sleeper of sleepers) {
            await SleeperAvailabilityModel.findOneAndUpdate(
                { date, sleeper: sleeper._id },
                {
                    date,
                    sleeper: sleeper._id,
                    isBooked: false,
                    isBeingBooked: false,
                    busNumber: sleeper.busNumber,
                },
                { upsert: true } // Create if not found
            );
        }
    }
}
