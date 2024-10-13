"use client"

import Footer from "@/components/server/footer";
import Navbar from "@/components/server/navbar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";


const layout = ({ children }: { children: React.ReactNode }) => {

    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        setIsPageLoaded(true);
    }, []);

    return (
        <div className="h-full w-full bg-gradient-to-b from-white to-blue-100">
            <RecoilRoot>
                <main>
                    <Navbar />
                    {children}
                    {isPageLoaded && <Footer />}
                </main>

                <Toaster />
            </RecoilRoot>
        </div>
    )
}

export default layout