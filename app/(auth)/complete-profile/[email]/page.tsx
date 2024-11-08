"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import axios, { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';

import { useDebounceCallback } from 'usehooks-ts';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import googleIcon from '@/public/GoogleIcon.webp'
import logo from '@/public/IMG_0863.png'
import Image from 'next/image';

import { useSession, } from "next-auth/react";


const Page = () => {

  const { toast } = useToast()

  const { data: session, status } = useSession();

  const router = useRouter();

  const currentPath = usePathname()

  const currentEmail = currentPath.split("/")[2]

  if (session?.user.phone) {
    router.replace('/')
  }

  const [phoneNo, setPhoneNo] = useState('')
  const [isCheckingPhoneNo, setIsCheckingPhoneNo] = useState(false)
  const [phoneNoMessage, setPhoneNoMessage] = useState('')
  const debounced = useDebounceCallback(setPhoneNo, 1000)


  useEffect(() => {
    const checkPhoneNoCorrect = async () => {
      if (phoneNo) {
        setIsCheckingPhoneNo(true);
        setPhoneNo('');
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-phoneNo-correctness?phoneNo=${phoneNo}`
          );

          setPhoneNoMessage(response.data.message);

        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setPhoneNoMessage(
            axiosError.response?.data.message ?? 'Error checking phone number'
          );
        } finally {
          setIsCheckingPhoneNo(false);
        }
      }
    };
    checkPhoneNoCorrect();
  }, [phoneNo]);

  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/add-details', { phone: phoneNumber, email: currentEmail })

      toast({
        title: 'Success',
        description: res.data.message,
      });
      console.log("Pushing")
      router.push('/');

    } catch (error) {
      console.log("Not Pushing")
      console.error('Error during updating details', error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your id. Please try again.');

      toast({
        title: 'Update details failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className=' w-full'>
          <Image className='m-auto w-20 ' src={logo} alt='Logo' />
        </div>
        <h1 className="text-2xl font-bold mt-2  text-center">Welcome to Sai Travels</h1>
        <p className=' text-sm text-center mb-4 text-gray-400'>Please add your phone number.</p>
        <div className='w-full'>
          <img
            src={session?.user.image}
            alt={session?.user.fullName || 'Profile Picture'}
            className="w-12 h-12 rounded-full m-auto mb-4"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone Number (+91)</label>
            <input
              id="Phone"
              type="text"
              onChange={(e) => {
                debounced(e.target.value);
                setPhoneNumber(e.target.value)
              }}
              className={`mt-1 block w-full p-2 border rounded-md `}
            />
            {isCheckingPhoneNo && <Loader2 className="animate-spin" />}
            {!isCheckingPhoneNo && phoneNoMessage && (
              <p className='text-sm text-red-500' >
                {phoneNoMessage}
              </p>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="text-base font-semibold bg-gradient-to-tr from-blue-900  w-full py-2 px-4 text-white rounded-md "
            >
              Continue --&gt;
            </Button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default Page;
