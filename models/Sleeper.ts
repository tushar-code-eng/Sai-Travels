import mongoose, { Schema, Document } from "mongoose";

export interface SleeperInterface extends Document {
    date: string;
    sleeperName: string;
    sleeperPrice: number;
    isBooked: boolean;
    isBeingBooked: boolean;
    busNumber: number[];
}

const SleeperSchema: Schema<SleeperInterface> = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    sleeperName: {
        type: String,
        required: true
    },
    sleeperPrice: {
        type: Number,
        required: true,
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
        default: [4567, 4321]
    }
})

const SleeperModel = (mongoose.models.Sleeper as mongoose.Model<SleeperInterface>) || mongoose.model<SleeperInterface>('Sleeper', SleeperSchema)

export default SleeperModel