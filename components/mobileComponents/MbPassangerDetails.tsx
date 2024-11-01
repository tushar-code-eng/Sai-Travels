"use client"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

import whatsapp from "@/public/whatsapp.png"
import { Switch } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, PickUpPointAtom, totalPriceAtom, YearAtom } from '@/app/(Recoil)/(atom)/FirstPage';
import { bookingSleeperAtom } from '@/app/(Recoil)/(atom)/setBookingSleepers';
import { contactAtom, passangerNamesAtom } from '@/app/(Recoil)/(atom)/passangerNames';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SleeperInterface } from '@/models/Sleeper';
import { useForm } from 'react-hook-form';

const MbPassangerDetails = () => {

    const router = useRouter()

    const { data: session } = useSession()

    const searchedParams = useSearchParams()

    const date = useRecoilValue(DateAtom)
    const month = useRecoilValue(MonthAtom)
    const day = useRecoilValue(DayAtom)
    const year = useRecoilValue(YearAtom)

    const pick = useRecoilValue(PickUpPointAtom)
    const drop = useRecoilValue(DropOffPointAtom)

    const totalprice = useRecoilValue(totalPriceAtom)

    const getNumberOfSleepers = searchedParams.get("number")

    const [bookingSleepers, setBookingSleepers] = useRecoilState(bookingSleeperAtom)
    const [formData, setFormData] = useRecoilState(passangerNamesAtom)

    const [contact, setContact] = useRecoilState(contactAtom)

    const [contactEmail, setContactEmail] = useState(session?.user.email)
    const [contactPhone, setContactPhone] = useState(session?.user.phone)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        setContact({ email: contactPhone, phone: contactEmail })
        router.push(`/payment`)
    };

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axios.get('/api/getBeingBookedSleeper')
            const datas = res.data
            const realdata = datas['sl'].map((it: SleeperInterface) => [it.sleeperName, it.sleeperPrice])
            setBookingSleepers(realdata)
        }
        fetchDetails()
    }, [])

    return (
        <div className=' md:hidden'>
            <div className=" border-2 border-slate-300 w-[95%] m-auto mt-2 rounded-lg shadow-xl p-2">
                <div className="flex justify-between">
                    <div>
                        <div className="text-sm font-bold">
                            Sun, 21 Apr - 23:45
                        </div>
                        <div className="text-xs">
                            PickUp
                        </div>
                    </div>
                    <div>
                        <ArrowForwardIcon />
                    </div>
                    <div>
                        <div className="text-sm font-bold">
                            Mon, 22 Apr - 23:45
                        </div>
                        <div className="text-xs">
                            Drop Off
                        </div>
                    </div>
                </div>
                <div className="font-bold text-yellow-500 mt-2">
                    VOLVO AC Sleeper (2+1)
                </div>
                <div>
                    <div className="h-36 p-2 flex justify-center gap-6">
                        <div className=" flex flex-col justify-between" >
                            <div>
                                9:30PM
                            </div>
                            <div >
                                8 hrs
                            </div>
                            <div >
                                4:00AM
                            </div>
                        </div>
                        <div className="h-full w-2 bg-slate-300 flex flex-col items-center justify-between">
                            <div className="w-2 h-2 bg-black rounded-[50%]">
                            </div>
                            <div className="w-2 h-2 bg-black rounded-[50%]">
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between" >
                            <div>
                                <b>CHANDIGARH</b>
                            </div>
                            <div >
                                <b>JAMMU</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='border-2 border-slate-300 w-[95%] m-auto mt-2 rounded-lg shadow-xl p-2'>
                    <div>
                        <div className='text-xl font-bold'>
                            Contact Details
                        </div>
                        <div className='text-xs'>
                            Tickets and bus details will be sent here
                        </div>
                    </div>
                    <div className='w-[95%] border rounded px-2 py-1 m-auto mt-3 bg-gray-200 cursor-not-allowed '>
                        <div className='text-xs'>
                            Email ID
                        </div>
                        <input
                        
                            {...register('email')}
                            className='font-semibold outline-none w-full cursor-not-allowed '
                            readOnly
                            defaultValue={session?.user.email}
                            disabled
                        />
                    </div>
                    <div className='w-[95%] border bg-white rounded px-2 py-1 m-auto my-3'>
                        <div className='text-xs'>
                            Phone
                        </div>
                        <input
                            {...register('phone')}
                            className='font-semibold outline-none w-full'
                            defaultValue={session?.user.phone}
                        />
                    </div>
                </div>

                <div className='border-2 border-slate-300 w-[95%] m-auto mt-2 rounded-lg shadow-xl p-2'>
                    <div className='text-xl font-bold'>
                        Passenger Details
                    </div>
                    <>
                        {bookingSleepers.map((seat, index) => (
                            <div key={index} className="flex  py-2 justify-between items-center gap-2">
                                <input
                                    {...register(`passengers.${index}.fullName`)}
                                    className="border-2 w-[45%] py-2 px-3 rounded-lg"
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                />
                                <input
                                    {...register(`passengers.${index}.age`)}
                                    className="border-2 py-2 px-3 max-w-14 rounded-lg"
                                    type="text"
                                    placeholder="Age"
                                    required
                                />
                                <select
                                    {...register(`passengers.${index}.gender`)}
                                    id="gender"
                                    name="gender"
                                    className="border-2 cursor-pointer w-[35%] appearance-none rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        ))}
                    </>
                </div> 
                <div className='w-full m-auto flex justify-center items-center'>
                    <button type="submit" className="font-semibold text-lg w-full m-2 bg-gradient-to-tr from-blue-900 to-blue-700 py-2 px-4 rounded text-white">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MbPassangerDetails

