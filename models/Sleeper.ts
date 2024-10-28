import mongoose , {Schema,Document} from "mongoose";

export interface SleeperInterface extends Document{
    sleeperName:string,
    sleeperPrice:number,
    isBooked:boolean,
    isBeingBooked:boolean
    busNumber:7468 | 7882
}

const SleeperSchema:Schema<SleeperInterface> = new mongoose.Schema({
    sleeperName:{
        type:String,
        required:true,
        unique:true
    },
    sleeperPrice:{
        type:Number,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    isBeingBooked:{
        type:Boolean,
        default:false
    },
    busNumber:{
        type:Number,
        enum:[7468,7882],
        required:true
    }
})

const SleeperModel = (mongoose.models.Sleeper as mongoose.Model<SleeperInterface>) || mongoose.model<SleeperInterface>('Sleeper',SleeperSchema)

export default SleeperModel