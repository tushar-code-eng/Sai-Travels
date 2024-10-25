import mongoose, { Schema, Document } from "mongoose";
import { SleeperInterface } from "./Sleeper";

export interface Passanger extends Document {
    fullName: string,
    age: number,
    gender: 'male' | 'female' | 'other'
    sleeper: SleeperInterface
}

export const PassangerSchema: Schema<Passanger> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    sleeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sleeper'
    }
})

const PassangerModel = (mongoose.models.Passanger as mongoose.Model<Passanger>) || mongoose.model<Passanger>('Passanger', PassangerSchema)

export default PassangerModel
