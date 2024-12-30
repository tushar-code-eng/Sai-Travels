"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { signIn } from 'next-auth/react'

import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';

import { useDebounceCallback } from 'usehooks-ts';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import googleIcon from '@/public/GoogleIcon.webp'
import logo from '@/public/logo.png'
import Image from 'next/image';


const schema = z.object({
    fullName: z.string(),
    email: z.string().nonempty('Email or phone number is required'),
    phone: z.string().nonempty('Email or phone number is required'),
    password: z.string().nonempty('Password is required'),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
    const [phoneNo, setPhoneNo] = useState('')
    const [isCheckingPhoneNo, setIsCheckingPhoneNo] = useState(false)
    const [phoneNoMessage, setPhoneNoMessage] = useState('')
    const debounceed = useDebounceCallback(setPhoneNo, 1000)

    const [emails, setEmails] = useState('')
    const [isCheckingEmail, setIsCheckingEmail] = useState(false)
    const [emailMessage, setEmailMessage] = useState('')
    const debounceedEmail = useDebounceCallback(setEmails, 1000)

    const router = useRouter();




    // useEffect(() => {
    //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    //         'size': 'normal',
    //         'callback': (res: any) => {

    //         },
    //         'expired-callback': () => {

    //         }
    //     })

    // }, [auth])

    // const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    //     'size': 'invisible',
    //     'callback': (response: any) => {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber
    //     }
    // });



    useEffect(() => {
        const checkEmailCorrect = async () => {
            if (emails) {
                setIsCheckingEmail(true);
                setEmails('');
                try {
                    const response = await axios.get<ApiResponse>(
                        `/api/check-email-correctness?email=${emails}`
                    );
                    console.log(response)
                    setEmailMessage(response.data.message);

                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setEmailMessage(
                        axiosError.response?.data.message ?? 'Error checking email address'
                    );
                } finally {
                    setIsCheckingEmail(false);
                }
            }
        };
        checkEmailCorrect();
    }, [emails]);

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
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        console.log('working')

        try {
            const res = await axios.post('/api/sign-up', data)

            toast({
                title: 'Success',
                description: res.data.message,
            });

            router.replace(`/verify/${data.email}/${data.phone}`);

            setLoading(false);

        } catch (error) {
            console.error('Error during sign-up:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your sign-up. Please try again.');

            toast({
                title: 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setLoading(false);
        }

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <div className=' w-full'>
                    <Image className='w-20 m-[-10px]' src={logo} alt='Logo' />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            {...register('fullName')}
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            onChange={(e) => {
                                debounceedEmail(e.target.value)
                            }}
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {isCheckingEmail && <Loader2 className="animate-spin" />}
                        {!isCheckingEmail && emailMessage && (
                            <p className='text-sm text-red-500' >
                                {emailMessage}
                            </p>
                        )}
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div id="recaptcha-container"></div>

                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </div>
                </form>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="mt-6">
                    
                    <Button
                        onClick={() => {
                            signIn('google',
                              { callbackUrl: '/' }
                            )
                          }}
                        className="w-full bg-white text-black border-black hover:bg-slate-200 border py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Sign Up with Google
                        <Image className='w-8' src={googleIcon} alt="Google" />
                    </Button>
                </div>
                <div id='recaptcha-container' />
                <div className='flex justify-center mt-2'>
                    <a href='/sign-in'>Already have an account? <u>Sign In</u></a>
                </div>
            </div>
        </div >
    );
};

export default SignUp;
