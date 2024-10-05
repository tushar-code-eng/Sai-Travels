"use client"

import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { headers } from "next/headers";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

interface checkOutProps {
    amount: number | undefined
    sendTicket: () => Promise<string>
}

const CheckoutPage = ({ amount, sendTicket }: checkOutProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | undefined>("")
    const [clientSecret, setClientSecret] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log('running')
        const details = async () => {
            const res = await axios.post(`/api/create-payment-intent`, {
                amount: JSON.stringify(convertToSubcurrency(amount))
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
            setClientSecret(res.data.clientSecret)
        }
        details()
    }, [amount])

    const paymentElementOptions = {
        layout: "tabs",
    };

    if (!stripe || !clientSecret || !elements) {
        return <Loader2 />
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const ticketId = await sendTicket()

        if (!stripe || !elements) {
            return
        }

        const { error: submitError } = await elements.submit()

        if (submitError) {
            setErrorMessage(submitError.message)
            setLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?id=${ticketId}`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unexpected error occurred.");
        }

        

    }

    return (

        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <Button disabled={!stripe || loading} className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
                {!loading ? `Pay ₹ ${amount}` : "Processing..."}
            </Button>
        </form>
    )
}

export default CheckoutPage
