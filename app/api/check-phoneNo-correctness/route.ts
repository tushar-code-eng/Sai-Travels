import dbConnection from "@/lib/dbConnection";
// import UserModel from "@/models/User";
import { z } from "zod"
import { phoneNoCorrectness } from "@/ZodSchemas/inputCorrectness"

//We are validating username using zod
const phoneNoQueryScehma = z.object({
    phone:phoneNoCorrectness
})

export async function GET(req: Request) {
    await dbConnection()

    try {
        //getting the username from query parameters
        const { searchParams } = new URL(req.url)
        const queryParam = {
            phone: searchParams.get("phoneNo")
        }

        //validate username using zod
        const result = phoneNoQueryScehma.safeParse(queryParam)

        if (!result.success) {
            const phoneErrors = result.error.format().phone?._errors || []
            return Response.json(
                {
                    success: false,
                    message: phoneErrors.length > 0 ? phoneErrors.join(",") : "Please enter a valid phone number"
                },
                {
                    status: 400
                }
            )
        }


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
                message: "Error while checking username"
            },
            {
                status: 500
            }
        )
    }
}