<<<<<<< HEAD
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

const dbConnection = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        console.log("Skipping DB connection during build");
        return;
    }

    if (connection.isConnected) {
        console.log("DB already connected");
        return;
    }

    if (!process.env.MONGO_URI) {
        console.log("MONGO_URI is not defined");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {});
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connection successful");
    } catch (error) {
        console.log("DB connection failed", error);
    }
}

export default dbConnection;
=======
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: Number
}

const connection: ConnectionObject = {}

const dbConnection = async (): Promise<void> =>{
    if(connection.isConnected){
        console.log("DB already connected")
        return 
    }
    try{
        const db = await mongoose.connect(process.env.MONGO_URI || "",{})

        connection.isConnected = db.connections[0].readyState

        console.log("DB connection successfull")
    }catch(error){

        console.log("DB connection failed")

        process.exit(1)

    }
}

export default dbConnection
>>>>>>> a3c0ee073f475d5e35ac59955f3c5cf72b6af425
