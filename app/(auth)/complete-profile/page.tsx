"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { getSession, signIn } from 'next-auth/react'

import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';

import { useDebounceCallback } from 'usehooks-ts';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import googleIcon from '@/public/GoogleIcon.webp'
import logo from '@/public/IMG_0863.png'
import Image from 'next/image';

import { useSession, } from "next-auth/react";


const schema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;


const Page = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (session?.user.phone) {
    router.replace('/')
  }

  const [phoneNo, setPhoneNo] = useState('')
  const [isCheckingPhoneNo, setIsCheckingPhoneNo] = useState(false)
  const [phoneNoMessage, setPhoneNoMessage] = useState('')
  const debounceed = useDebounceCallback(setPhoneNo, 1000)

  const [emails, setEmails] = useState('')
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailMessage, setEmailMessage] = useState('')
  const debounceedEmail = useDebounceCallback(setEmails, 1000)


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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: session?.user.name,
      email: session?.user.email,
      phone: '',
      password: '',
    },
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (data: FormData) => {
    if(data.fullName === ""){
      data.fullName = session?.user.name
    }
    if(data.email === ""){
      data.email = session?.user.email
    }
    console.log(data)

    if (data.password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'The passwords do not match. Please try again.',
        variant: 'destructive',
      });

      return;
    }

    try {
      const res = await axios.post('/api/add-details', data)

      if (res.data.success) {

        await signIn('credentials', {
          redirect: false,
          email: data.email, // Use the email provided in the form
          password: data.password, // Use the password provided in the form
        })
      }

      toast({
        title: 'Success',
        description: res.data.message,
      });

      console.log("after session",session?.user)

      router.replace(`/`);

    } catch (error) {
      console.error('Error during updating details', error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your id. Please try again.');

      toast({
        title: 'Update details failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className=' w-full'>
          <Image className='m-auto w-20 ' src={logo} alt='Logo' />
        </div>
        <h1 className="text-2xl font-bold mt-2  text-center">Welcome to Sai Travels</h1>
        <p className=' text-sm text-center mb-4 text-gray-400'>Please complete your details.</p>
        <div className='w-full'>
          <img
            src={session?.user.image}
            alt={session?.user.fullName || 'Profile Picture'}
            className="w-12 h-12 rounded-full m-auto mb-4"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              defaultValue={session?.user.name}
              {...register('fullName')}
              className={`mt-1 block w-full p-2 border rounded-md] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />

          </div>
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              defaultValue={session?.user.email}
              readOnly
              {...register('email')}
              className={`mt-1 block w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />


          </div>

          <div>
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone Number (+91)</label>
            <input
              id="Phone"
              type="text"
              {...register('phone')}
              onChange={(e) => {
                debounceed(e.target.value)
              }}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {isCheckingPhoneNo && <Loader2 className="animate-spin" />}
            {!isCheckingPhoneNo && phoneNoMessage && (
              <p className='text-sm text-red-500' >
                {phoneNoMessage}
              </p>
            )}
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />

          </div>
          <div>
            <label htmlFor="Confirmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="Confirmpassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />

          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
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
