<<<<<<< HEAD
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ProtectionRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        if (!session) {
            const redirectUrl = `/sign-in?redirected=true`;
            router.push(redirectUrl);
        }
    });

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectionRoute;
=======
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ProtectionRoute = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get query parameters
    const date = searchParams.get("date");
    const numberOfPassengers = searchParams.get("number");
    const totalPrice = searchParams.get("Price");
    const pickupLocation = searchParams.get("pickfrom");
    const dropoffLocation = searchParams.get("dropto");

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        if (!session) {
            const redirectUrl = `/sign-in?redirected=true`;
            router.push(redirectUrl);
        }
    }, [session, status, pathname, numberOfPassengers, date, pickupLocation, dropoffLocation, totalPrice, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectionRoute;
>>>>>>> a3c0ee073f475d5e35ac59955f3c5cf72b6af425
