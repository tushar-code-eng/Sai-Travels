"use client"

import ProtectionRoute from "@/components/protectingRoutes"
import { Toaster } from "@/components/ui/toaster"
import { RecoilRoot } from "recoil"


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <RecoilRoot >
                <ProtectionRoute>
                    <main>
                        {children}
                    </main>
                    <Toaster />
                </ProtectionRoute>
            </RecoilRoot>
        </div>
    )
}

export default layout