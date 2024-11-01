"use client"

import { RecoilRoot } from "recoil";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <RecoilRoot>
                <main>
                    {children}
                </main>
            </RecoilRoot>
        </div>
    )
}

export default layout