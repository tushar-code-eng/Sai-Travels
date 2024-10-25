import mongoose, { Schema, Document } from "mongoose";
import { SleeperInterface } from "./Sleeper";
import { UserInterface } from "./User";
import { Passanger, PassangerSchema } from "./Passanger";

export interface Tickets extends Document {
    sleepers: SleeperInterface[],
    user: UserInterface,
    passangers: [],
    bookingTime: Date,
    totalAmount: Number
    // advancePaid: Number,
    // remainingAmount: Number,
    paymentStatus: 'partial' | 'full',
}

const TicketSchema: Schema<Tickets> = new mongoose.Schema({
    sleepers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sleeper',
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passangers: [],
    bookingTime: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['partial', 'full'],
        required: true
    },
});

const TicketModel = (mongoose.models.Tickets as mongoose.Model<Tickets>) || mongoose.model<Tickets>('Tickets', TicketSchema)

export default TicketModel

