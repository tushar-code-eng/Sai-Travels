import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";

export async function POST(req: Request) {
    await dbConnection()

    try {
        const { sleeperName, sleeperPrice, busNumber } = await req.json()

        const sleeperAlreadyExists = await SleeperModel.findOne({ sleeperName })

        if (sleeperAlreadyExists) {
            return Response.json({
                success: false,
                message: "Sleeper already exisits"
            })
        }

        await new SleeperModel({
            sleeperName,
            sleeperPrice,
            busNumber
        }).save()

        return Response.json(
            {
                success: true,
                message: 'New Sleeper created',
            },
            { status: 201 }
        );

    } catch (err) {
        console.log('Error creating sleeper: ', err)
        return Response.json(
            {
                success: false,
                message: 'Error creating sleeper'
            },
            { status: 500 }
        )
    }
}