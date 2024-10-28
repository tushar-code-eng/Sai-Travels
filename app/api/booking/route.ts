// import dbConnection from "@/lib/dbConnection";
// import PassangerModel from "@/models/Passanger";

// export async function POST(req: Request) {
//     await dbConnection()

//     try {
//         const ls = await req.json()



//         const newPassanger = new PassangerModel({
//             sleeper,
//             fullName: name,
//             age,
//             gender
//         })
//         console.log(newPassanger)
//         newPassanger.save()
//         return Response.json({
//             success: true,
//             message: "Passanger added successfully"
//         })
//     } catch (err) {
//         return Response.json({
//             success: false,
//             message: "error in adding passanger"
//         })
//     }
// }