import dbConnection from "@/lib/dbConnection";
// import UserModel from "@/models/User";
import { z } from "zod"
import { emailCorrectness } from "@/ZodSchemas/inputCorrectness"

//We are validating username using zod
const emailQueryScehma = z.object({
    email:emailCorrectness
})

export async function GET(req: Request) {
    await dbConnection()

    try {
        //getting the username from query parameters
        const { searchParams } = new URL(req.url)
        const queryParam = {
            email: searchParams.get("email")
        }

        //validate username using zod
        const result = emailQueryScehma.safeParse(queryParam)

        if (!result.success) {
            const emailErrors = result.error.format().email?._errors || []
            return Response.json(
                {
                    success: false,
                    message: emailErrors.length > 0 ? emailErrors.join(",") : "Please enter a valid email address"
                },
                {
                    status: 400
                }
            )
        }

        // const { phone } = result.data

        // const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })

        // if (existingVerifiedUser) {
        //     return Response.json(
        //         {
        //             success: false,
        //             message: "Username already taken"
        //         },
        //         {
        //             status: 400
        //         }
        //     )
        // }

        return Response.json(
            {
                success: true,
                
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        return Response.json(
            {
                success: false,
                message: "Error while checking email"
            },
            {
                status: 500
            }
        )
    }
}