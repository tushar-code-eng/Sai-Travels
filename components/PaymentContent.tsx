"use client"

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "@/components/laptopComponents/LpPayment";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import axios from "axios";
import { useRecoilValue } from "recoil";
// import { bookingSleeperAtom } from "@/app/(Recoil)/(atom)/setBookingSleepers";
import { useSession } from "next-auth/react";
import { passangerNamesAtom } from "@/app/(Recoil)/(atom)/passangerNames";
import Timmer from "@/components/laptopComponents/Timmer";
import { totalPriceAtom } from "@/app/(Recoil)/(atom)/FirstPage";
import { SleeperDateAtom } from "@/app/(Recoil)/(atom)/SleeperDate";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("API Stripe key undefined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentContent = () => {

    const { data: session } = useSession()

    const totalprice = useRecoilValue(totalPriceAtom)

    const pg = useRecoilValue(passangerNamesAtom)

    const sleeperDate = useRecoilValue(SleeperDateAtom)

    const sendTicket = async () => {
        try {
            const res = await axios.post(`/api/setTicket`, {
                user: session?.user.email,
                passangers: pg,
                totalAmount: totalprice,
                sleeperDate:sleeperDate
            })
            localStorage.setItem(`paymentSuccess_${session?.user}`, 'true');
            return res.data.ticketId
        } catch (error) {
            console.error('Error updating payment success:', error);
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="my-4 ">
                    <Timmer />
                </div>
                <div className="">
                    <h1 className="text-center text-4xl font-extrabold mb-2">Complete Transaction</h1>
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: convertToSubcurrency(Number(localStorage.getItem('tPrice'))),
                            currency: "inr"
                        }}
                    >
                        <CheckoutPage sendTicket={sendTicket} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default PaymentContent

