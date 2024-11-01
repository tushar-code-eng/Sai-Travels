"use client"

import { SleeperInterface } from '@/models/Sleeper'
import axios, { AxiosResponse } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button } from '../ui/button'

import { passangerDetailSchema } from '@/ZodSchemas/passangerDetailsSchema'

import { contactAtom, passangerNamesAtom } from '@/app/(Recoil)/(atom)/passangerNames'

import { useSession } from 'next-auth/react'
import { bookingSleeperAtom } from '@/app/(Recoil)/(atom)/setBookingSleepers'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DateAtom, DayAtom, DropOffPointAtom, MonthAtom, PickUpPointAtom, totalPriceAtom, YearAtom } from '@/app/(Recoil)/(atom)/FirstPage'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface formSchema {
    fullname: string,
    age: string,
    gender: ['Male', 'Female', 'Other'],
    contact: string,
    emailContact: string
}

const LpPassangerDetails = () => {
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

    useEffect(() => {
        const fetchDetails = async () => {
            const res = await axios.get('/api/getBeingBookedSleeper')
            const datas = res.data
            const realdata = datas['sl'].map((it: SleeperInterface) => [it.sleeperName, it.sleeperPrice])
            setBookingSleepers(realdata)
        }
        fetchDetails()
    }, [])


    const handleChange = (index: number, field: string, value: string) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = { ...updatedFormData[index], [field]: value };
        setFormData(updatedFormData);
    };

    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setContact({ email: contactPhone, phone: contactEmail })
        router.push(`/payment`)
    };

    return (
        <div className="hidden md:block w-full mb-6">
            <form onSubmit={handleSubmitForm} className="h-full overflow-auto">
                <div className=" w-[85%] m-auto justify-between ">
                    <div className="w-full rounded-lg flex justify-between">
                        <div className=" bg-white fair-details w-1/2 m-4 shadow-lg rounded-lg flex flex-col justify-between h-64 ">
                            <div className="px-4 py-2 text-center text-xl font-semibold">
                                Fare Details
                            </div>
                            <div className="">
                                <div className="flex justify-between py-2 px-4 font-medium">
                                    <div>
                                        Sleeper
                                    </div>
                                    <div>
                                        Price
                                    </div>
                                </div>
                                {bookingSleepers.map((index, i) => (
                                    <div key={i} className="flex justify-between px-4 font-medium">
                                        <div>
                                            {index[0]}
                                        </div>
                                        <div>
                                            ₹ {index[1]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=" flex justify-between py-2 px-4">
                                <div>
                                    Amount to be paid
                                </div>
                                <div className="font-bold">
                                    <div className='text-green-600' >₹ <b>{totalprice}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className=" bg-white w-1/2 m-4 shadow-lg rounded-lg h-64 overflow-auto ">
                            <div className="px-4 py-2 text-center text-xl font-semibold">
                                Passangers Detail
                            </div>
                            <>
                                {bookingSleepers.map((seat, index) => (
                                    <div key={index} className="flex px-5 py-2 justify-between items-center gap-2">
                                        <input
                                            className="border-2 py-2 px-3 rounded-lg"
                                            type="text"
                                            placeholder="Full Name"
                                            required
                                            onChange={(e) => handleChange(index, 'fullName', e.target.value)}
                                        />
                                        <input
                                            className="border-2 py-2 px-3 rounded-lg min-w-14"
                                            type="text"
                                            placeholder="Age"
                                            required
                                            // value={formData[index].age}
                                            onChange={(e) => handleChange(index, 'age', e.target.value)}
                                        />
                                        <select
                                            id="gender"
                                            name="gender"
                                            className="border-2 cursor-pointer appearance-none rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                            // value={formData[index].gender}
                                            onChange={(e) => handleChange(index, 'gender', e.target.value)}
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

                    </div>


                    <div className="w-full rounded-lg flex justify-between">
                        <div className=' bg-white w-1/2 m-4 shadow-lg rounded-lg p-3    '>
                            <div className="px-4 py-2 text-center text-xl font-semibold">
                                Booking Details
                            </div>
                            <div className='flex'>
                                <div className="flex px-4 py-2">
                                    <div className=" mt-2 w-2 bg-blue-100 flex flex-col items-center justify-between">
                                        <div className="w-5 h-5 flex items-center justify-center rounded-[50%]">
                                            <LocationOnIcon fontSize='small' color='error' />
                                        </div>
                                        <div className="w-5 h-5 flex items-center justify-center rounded-[50%]">
                                            <LocationOnIcon fontSize='small' color='success' />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between h-44 px-4">
                                        <div>
                                            {pick} <b className='text-red-600'>9:30pm</b>
                                        </div>
                                        <div>
                                            {drop} <b className='text-green-600'>4:30am</b>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className=''> */}
                                <div className=' w-auto m-2 rounded p-4 flex flex-col justify-center items-start gap-2'>
                                    <div className='border-2 px-2 py-1 rounded-md'>
                                        {date} {month} {year}, {day}
                                    </div>
                                    <div className='border-2 px-2 py-1 rounded-md'>
                                        CH 01 563837
                                    </div>
                                    <div className='border-2 px-2 py-1 rounded-md'>
                                        Number of sleepers - {getNumberOfSleepers}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className='w-1/2 mt-5 mr-4 rounded-lg' >
                            <div className="shadow-lg bg-white">
                                <div className="px-4 py-2 text-center text-xl mt-1 font-semibold bg-white">
                                    Contact Details
                                </div>
                                <div className="w-full justify-items-start items-center px-5 py-2">
                                    <div className='flex gap-2 items-center justify-start'>
                                        <div>Phone No.</div>
                                        <div className="border-2 py-2 px-3 rounded-lg">+91</div>
                                        <input defaultValue={session?.user.phone} required className="border-2 py-2 px-3 rounded-lg" type="text" value={session?.user.phoneNo} onChange={(e) => { setContactPhone(e.target.value) }} />
                                    </div>
                                    <div className='flex gap-2 items-center justify-start' >
                                        <div>Email -</div>
                                        <input defaultValue={session?.user.email} required className="my-3 border-2 min-w-4 py-2 px-3 rounded-lg bg-gray-200 cursor-not-allowed" type="email" value={session?.user.email} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center ">
                                <Button type='submit' className="px-6 w-1/2 mx-2 py-3 font-semibold text-white bg-gradient-to-tr from-blue-900 to-indigo0-500 rounded-lg mt-8">
                                    Proceed To payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LpPassangerDetails
