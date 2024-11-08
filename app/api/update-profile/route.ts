import dbConnection from "@/lib/dbConnection"
import UserModel from "@/models/User"

export async function POST(req: Request) {
    await dbConnection()
    try {
        const { fullName, email } = await req.json()

        const user = await UserModel.findOne({ email })

        
        if (!user) {
            return Response.json({
                success: false,
                title: "User Not Found",
                message: "User not found!"
            }, { status: 404 })
        }
        
        user.fullName = fullName
        console.log(fullName)
        await user.save()

        return Response.json({
            success: true,
            title: "Profile Updated!",
            message: "Your password is updated successfully"
        }, { status: 200 })

    } catch (error) {
        return Response.json({
            success: false,
            title: "Internal Error!",
            message: error
        }, { status: 500 })
    }
}