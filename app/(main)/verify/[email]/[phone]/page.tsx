'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/ZodSchemas/verifySchema';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';

import { useRecoilValue } from 'recoil';
import { confirmationResultAtom } from '@/app/(Recoil)/(atom)/confirmationResult';

export default function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{ email: string, phone: string }>();
    const { toast } = useToast();

    const [code, setCode] = useState(Array(6).fill(''));
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [resendCountDown, setResendCountDown] = useState(0)

    const confirmationResult = useRecoilValue(confirmationResultAtom)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendCountDown > 0) {
            timer = setTimeout(() => { setResendCountDown(resendCountDown - 1), 1000 })
        }
        return () => clearTimeout(timer)
    }, [resendCountDown])

    const handleChangeEmail = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDownEmail = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleChangePhone = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDownPhone = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const verificationCodeEmail = code.join('');
        const verificationCodePhone = otp.join('');
        try {
            await confirmationResult?.confirm(verificationCodePhone)
            setOtp(Array(6).fill(''))

            const Emailresponse = await axios.post<ApiResponse>(`/api/verify-code`, {
                email: params.email,
                phone: params.phone,
                code: verificationCodeEmail,
            });

            await confirmationResult?.confirm(verificationCodePhone)

            toast({
                title: 'Success',
                description: Emailresponse.data.message,
            });

            router.replace('/sign-in');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.log(error)
            toast({
                title: 'Verification Failed',
                description:
                    axiosError.response?.data.message ??
                    'An error occurred. Please try again.',
                variant: 'destructive',
            });
        }
    };


    return (
        <div className='w-full flex justify-around'>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 m-auto w-[35%]">
                <h1 className="text-2xl font-bold mb-4">Verification</h1>
                <p className='mb-6'>Verification code has been sent to your registered email</p>

                <div className="flex gap-2 mb-4">
                    {code.map((digit, index) => (
                        <>
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChangeEmail(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDownEmail(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl"
                            />
                            <div className='mt-3'>
                                {index === 2 ? "--" : ""}
                            </div>

                        </>
                    ))}
                </div>

                <Button onClick={handleSubmit} className="w-full max-w-xs">
                    Verify
                </Button>
                <Separator />
            </div>

            {/* <div className="flex flex-col items-center justify-center min-h-screen py-2 m-auto w-[35%]">
              <h1 className="text-2xl font-bold mb-4">Verification</h1>
                <p className='mb-6'>Verification code has been sent to your registered phone number</p>

                <div className="flex gap-2 mb-4">
                    {code.map((digit, index) => (
                        <>
                            <input
                                  key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChangePhone(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDownPhone(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl"
                            />
                            <div className='mt-3'>
                                {index === 2 ? "--" : ""}
                            </div>

                        </>
                    ))}
                </div>

                <Button onClick={handleSubmit} className="w-full max-w-xs">
                    Verify
                </Button>
                <Separator />
            </div> */}
        </div>
    );
}