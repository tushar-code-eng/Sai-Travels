import mongoose, { Schema, Document } from "mongoose"
import { SleeperInterface } from "./Sleeper";


const SleeperAvailabilityTomorrowSchema: Schema<SleeperInterface> = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    sleeperName:{
        type:String,
        required:true
    },
    sleeperPrice:{
        type:Number,
        required:true,
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    isBeingBooked: {
        type: Boolean,
        default: false
    },
    busNumber: {
        type: [Number],
        default:[4567,4321]
    }
});

const SleeperAvailabilityTomorrowModel = mongoose.models.SleeperAvailabilityTomorrow as mongoose.Model<SleeperInterface> ||
    mongoose.model<SleeperInterface>('SleeperAvailabilityTomorrow', SleeperAvailabilityTomorrowSchema);

export default SleeperAvailabilityTomorrowModel;



