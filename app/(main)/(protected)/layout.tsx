"use client"

import ProtectionRoute from "@/components/protectingRoutes"
import { Toaster } from "@/components/ui/toaster"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <ProtectionRoute>
                <main>
                    {children}
                </main>
                <Toaster />
            </ProtectionRoute>
        </div>
    )
}

export default layout