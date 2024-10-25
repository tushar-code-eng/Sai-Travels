import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        fullName?: string;
        email?: string;
        phone?: string;
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            fullName?: string;
            email?: string;
            phone?: string;
        } & DefaultSession['user'];
    }

}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        fullName?: string;
        email?: string
        phone?: string
    }
}