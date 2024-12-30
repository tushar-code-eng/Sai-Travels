import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    await dbConnection()
    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json({
            success: false,
            message: "You must be logged in to view this page"
        })
    }

    try {
        const user = await UserModel.findOne({ email: session.user.email })

        if (!user) {
            return Response.json({
                success: false,
                message: "Error in fetching the user"
            })
        }
        
        return Response.json({
            user,
            success: true,
            message: "Here is the user"
        },{status:200})
        
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in fetching the user"
        },{status:400})

    }
}