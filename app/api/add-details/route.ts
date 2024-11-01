import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'

import { getToken } from 'next-auth/jwt';


export async function POST(req: Request) {
    await dbConnection()

    try {
        const { fullName, email, phone, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log("Details",fullName,email,phone,password)

        const userUpdate = await UserModel.findOne({ email })
        if (userUpdate) {
            userUpdate.fullName = fullName
            userUpdate.phone = phone
            userUpdate.password = hashedPassword

            await userUpdate.save()

           
            return Response.json(
                {
                    success: true,
                    message: 'Details updated successfully',
                    user: { fullName: userUpdate.fullName, phone: userUpdate.phone, email: userUpdate.email },
                },
                { status: 201 }
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