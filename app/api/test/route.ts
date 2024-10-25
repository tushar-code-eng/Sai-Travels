import dbConnection from "@/lib/dbConnection";

export async function GET(req:Request){
    await dbConnection()
    return Response.json(
        {
            success: true,
            message: 'Message acceptance status updated successfully',
                
        },
        {
            status: 200
        }
    );
}