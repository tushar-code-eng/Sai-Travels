import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        ),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnection();
                // console.log(credentials)
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            // { phone: credentials.identifier },
                        ],
                    });
                    console.log(user)

                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await dbConnection();
                const existingUser = await UserModel.findOne({ email: user.email, isVerified: true });
                if (!existingUser) {
                    console.log("comming")
                    const expiryDate = new Date();
                    expiryDate.setHours(expiryDate.getHours() + 1);
                    const newUser = new UserModel({
                        fullName: user.name,
                        email: user.email,
                        phone: user.phone,
                        password: "NoPassword",
                        verifyCode: 9999,
                        verifyCodeExpiry: expiryDate,
                        isVerified: true,
                        googleSignIn: true
                    });
                    await newUser.save();
                    return `/complete-profile/${user.email}`;
                } else {
                    return true;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {

            if (trigger === "update") {
                return { ...token, ...session.user }
            }

            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.fullName = user.fullName;
                token.email = user.email
                token.phone = user.phone
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.fullName = token.fullName;
                session.user.email = token.email;
                session.user.phone = token.phone

            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/api/sign-in',
    },
}

