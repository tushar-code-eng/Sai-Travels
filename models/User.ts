import mongoose, { Schema, Document } from 'mongoose'

export interface BookingInfo extends Document {
    travelDate: Date
    noOfSingleSleeper: number
    noOfDoubleSleeper: number
    createdAt: Date
}

const BookingInfoSchema: Schema<BookingInfo> = new mongoose.Schema({
    travelDate: {
        type: Date,
        required: [true, 'Travel date is required']
    },
    noOfSingleSleeper: {
        type: Number,
        required: true,
        default: 0
    },
    noOfDoubleSleeper: {
        type: Number,
        required: true,
        default: 0
    }
})

export interface UserInterface extends Document {
    fullName: string
    email: string
    phone: number
    password: string
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    googleSignIn: boolean
    bookings: BookingInfo[]
}

const UserSchema: Schema<UserInterface> = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    phone: {
        type: Number,
        unique: true,
        match: [/^[6-9]\d{9}$/, 'Please use a valid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify Code is required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleSignIn: {
        type: Boolean,
        default: false
    },
    bookings: [BookingInfoSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>('User', UserSchema)

export default UserModel