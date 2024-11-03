
import cron from "node-cron";
import {initializeAvailabilityForTodayAndTomorrow} from "../helpers/SleeperAvailabilityHelper"; 

cron.schedule("0 0 * * *", async () => {
    await initializeAvailabilityForTodayAndTomorrow();
    console.log("Initialized sleeper availability for today and tomorrow");
});
