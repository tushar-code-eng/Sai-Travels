import dbConnection from "@/lib/dbConnection";
import SleeperModel from "@/models/Sleeper";
import TicketModel from "@/models/Tickets";
import UserModel from "@/models/User";

export async function POST(req: Request) {
    await dbConnection()
    try {
        const { user, passangers, totalAmount } = await req.json()

        const signedUser = await UserModel.findOne({ email: user })
        const sleepers = await SleeperModel.find({
            isBeingBooked: true
        })

        await Promise.all(
            sleepers.map(async (sleeper) => {
                console.log(sleeper)
                sleeper.isBooked = true;
                await sleeper.save();
            })
        );

        const newTicket = new TicketModel({
            sleepers,
            user: signedUser,
            passangers,
            totalAmount,
            paymentStatus: 'full'
        })

        await newTicket.save()

        return Response.json({
            ticketId: newTicket._id,
            success: true,
            message: "Ticket sent successfuly"
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Error setting ticket"
        })

    }
}