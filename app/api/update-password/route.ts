import dbConnection from "@/lib/dbConnection";
import UserModel, { UserInterface } from "@/models/User";
import bcrypt from 'bcryptjs'


export async function POST(req: Request) {
    dbConnection()
    try {
        const { currentPass, newPass, email } = await req.json()
        const currentUser = await UserModel.findOne({ email })

        if (!currentUser) {
            return Response.json({
                success: false,
                title: "User Not Found",
                message: "User not found!"
            }, { status: 500 })
        }

        const password = currentUser?.password

        const Match = await bcrypt.compare(currentPass, password)

        if (!Match) {
            return Response.json({
                success: false,
                title: "Invalid!",
                message: "Current password added is invalid"
            }, { status: 404 })
        }

        const hashedNewPass = await bcrypt.hash(newPass, 10)
        currentUser.password = hashedNewPass
        await currentUser.save()

        return Response.json({
            success: true,
            title: "Password Changed!",
            message: "Your password is changed successfully"
        }, { status: 200 })


    } catch (error) {
        return Response.json({
            success: false,
            title: "Internal Error!",
            message: error
        }, { status: 500 })

    }
}