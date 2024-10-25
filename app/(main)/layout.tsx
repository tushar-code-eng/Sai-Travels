"use client";

import Footer from "@/components/server/footer";
import Navbar from "@/components/server/navbar";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full bg-gradient-to-b from-white to-blue-100 min-h-screen flex flex-col">
      <RecoilRoot>
        <Navbar />

        <main className="flex-grow">{children}</main>

        <Footer />

        <Toaster />
      </RecoilRoot>
    </div>
  );
};

export default layout;
