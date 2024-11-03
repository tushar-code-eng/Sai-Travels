
"use client"

import { passangerNamesAtom } from '@/app/(Recoil)/(atom)/passangerNames'
import { bookingSleeperAtom } from '@/app/(Recoil)/(atom)/setBookingSleepers'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import whatsapp from "@/public/whatsapp.png"
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter, useSearchParams } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TicketTemplate from '@/components/server/ticketTemplate'

const Page = ({ searchParams: { amount }, }: { searchParams: { amount: string } }) => {

    const router = useRouter()

    const [ticketDetails, setTicketDetails] = useState<any>(null);

    const params = useSearchParams()

    const ticketId = params.get("id")

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await axios.get(`/api/getTicketDetails/${ticketId}`,
                );
                setTicketDetails(response.data.ticket);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketDetails();
    }, [ticketId]);
    console.log(ticketDetails)

    return (
        <div className="max-w-6xl h-[52vh] mx-auto p-10 bg-white text-center border m-10 rounded-md">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl mb-2">Your Ticket has been booked</h2>
                <p className='text-sm'> A copy of your ticket has been sent to your registered email id</p>

                <div className=' flex flex-col gap-4 items-center justify-center sm:flex sm:m-auto sm:justify-center sm:items-center sm:gap-4 mt-4'>
                    <div>
                        <Button>
                            {
                                (ticketDetails != null) ?
                                    <PDFDownloadLink document={<TicketTemplate ticketDetails={ticketDetails} />} fileName="Bus_Ticket.pdf">
                                        <h1>Download Ticket</h1>
                                    </PDFDownloadLink>
                                    :
                                    <h1>Download Ticket</h1>
                            }
                        </Button>

                    </div>
                    <div>
                        <Button className='flex items-center justify-center gap-2'>
                            <div>Send ticket on Whatsapp</div>
                            <div><Image src={whatsapp} width={20} alt='Image' /></div>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            router.replace('/')
                        }} >
                            Continue booking <ArrowForwardIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page
