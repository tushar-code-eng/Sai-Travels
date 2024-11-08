import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";


export async function POST(req: Request) {
    await dbConnection()

    try {
        const { phone, email } = await req.json()

        console.log("ji")

        const userUpdate = await UserModel.findOne({ email })
        if (userUpdate) {
            userUpdate.phone = phone

            await userUpdate.save()
            console.log("working")
            return Response.json(
                {
                    success: true,
                    message: 'Details updated successfully',
                    user: { fullName: userUpdate.fullName, phone: userUpdate.phone, email: userUpdate.email },
                },
                { status: 200 }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: 'Error in fetching user',
                },
                { status: 500 }
            );
        }
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error updatinng details',
            },
            { status: 500 }
        );
    }
}