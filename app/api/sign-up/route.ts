
import dbConnection from '@/lib/dbConnection';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs'


export async function POST(request: Request) {
    await dbConnection();

    try {
        const { fullName,email, phone, password } = await request.json();

        const existingVerifiedUserByphone = await UserModel.findOne({
            phone,
            isVerified: true,
        });

        if (existingVerifiedUserByphone) {
            return Response.json(
                {
                    success: false,
                    message: 'Account with this phone number already exists',
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: 'User already exists with this email',
                    },
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.email = email
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                fullName,
                email,
                phone,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
            });
            await newUser.save();
        }

        // Send verification email
        // const emailResponse = await sendVerificationEmail(
        //     email,
        //     fullName,
        //     verifyCode
        // );

        // if (!emailResponse.success) {
        //     return Response.json(
        //         {
        //             success: false,
        //             message: emailResponse.message,
        //         },
        //         { status: 500 }
        //     );
        // }


        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }

}