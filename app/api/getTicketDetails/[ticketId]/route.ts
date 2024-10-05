import dbConnection from "@/lib/dbConnection";
import TicketModel from "@/models/Tickets";

import { NextResponse } from "next/server";

export async function GET(req: Request,{params}:{params:{ticketId:string}}) {
    const ticketId = params.ticketId

    await dbConnection()

    if (!ticketId) {
        return NextResponse.json({ success: false, message: 'Ticket not found' }, { status: 400 });
    }

    try {
        const ticket = await TicketModel.findById(ticketId)
        .populate('sleepers')
        .populate('user')

        console.log(ticket)

        if (!ticket) {
            return NextResponse.json({ success: false, message: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true,ticket }, { status: 200 });

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in finding ticket"
        },
            { status: 500 }
        )
    }

}