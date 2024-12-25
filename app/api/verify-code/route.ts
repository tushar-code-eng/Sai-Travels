import dbConnection from '@/lib/dbConnection';
import UserModel from '@/models/User';

export async function POST(request: Request) {
    // Connect to the database
    await dbConnection();

    try {
        const { email, phone, code } = await request.json();
        const decodedEmail = decodeURIComponent(email);
        const decodedPhone = decodeURIComponent(phone);
        const user = await UserModel.findOne({ email: decodedEmail, phone: decodedPhone });


        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            // Update the user's verification status
            user.isVerified = true;
            await user.save();

            return Response.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );
        } else if (!isCodeNotExpired) {

            return Response.json(
                {
                    success: false,
                    message: 'Verification code has expired. Please sign up again to get a new code.',
                },
                { status: 400 }
            );
        } else {
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return Response.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}