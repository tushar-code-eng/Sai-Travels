
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
