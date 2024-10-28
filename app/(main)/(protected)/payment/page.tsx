<<<<<<< HEAD
"use client"

import React from "react";
import dynamic from 'next/dynamic';

const PaymentContent = dynamic(() => import('@/components/PaymentContent'), { ssr: false });

const Page = () => {
  return <PaymentContent />;
}

export default Page
=======
"use client"

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "@/components/laptopComponents/LpPayment";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { bookingSleeperAtom } from "@/app/(Recoil)/(atom)/setBookingSleepers";
import { useSession } from "next-auth/react";
import { passangerNamesAtom } from "@/app/(Recoil)/(atom)/passangerNames";
import Timmer from "@/components/laptopComponents/Timmer";
import { totalPriceAtom } from "@/app/(Recoil)/(atom)/FirstPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("API Stripe key undefined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const page = () => {

    const {data:session} = useSession()

    const totalprice = useRecoilValue(totalPriceAtom)

    const pg = useRecoilValue(passangerNamesAtom) 

    const sendTicket = async () => {
        try {
            const res = await axios.post(`/api/setTicket`, {
                user: session?.user.email,
                passangers: pg,
                totalAmount: totalprice,
            })
            localStorage.setItem(`paymentSuccess_${session?.user}`, 'true');
            console.log('Payment success updated:', res.data);
            return res.data.ticketId
        } catch (error) {
            console.error('Error updating payment success:', error);
        }
    }

    return (
        <div className="w-2/6 h-full mx-auto p-10 text-center border m-10 rounded-md bg-gradient-to-tr">
            <h1>
                <Timmer />
            </h1>
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Complete Transaction</h1>
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(totalprice),
                        currency: "inr"
                    }}
                >
                    <CheckoutPage sendTicket={sendTicket} amount={totalprice} />
                </Elements>
            </div>

        </div>
    )
}

export default page

>>>>>>> a3c0ee073f475d5e35ac59955f3c5cf72b6af425
