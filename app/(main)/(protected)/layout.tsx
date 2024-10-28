"use client"

import ProtectionRoute from "@/components/protectingRoutes"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <ProtectionRoute>
                <main>
                    {children}
                </main>
            </ProtectionRoute>
        </div>
    )
}

export default layout