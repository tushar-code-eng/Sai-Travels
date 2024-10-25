import dbConnection from "@/lib/dbConnection";

export async function GET(req:Request){
    await dbConnection()

    
}