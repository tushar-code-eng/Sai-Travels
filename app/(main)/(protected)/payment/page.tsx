
"use client"

import React from "react";
import dynamic from 'next/dynamic';

const PaymentContent = dynamic(() => import('@/components/PaymentContent'), { ssr: false });

// import PaymentContent from "@/components/PaymentContent";

const Page = () => {
  return <PaymentContent />;
}

export default Page
