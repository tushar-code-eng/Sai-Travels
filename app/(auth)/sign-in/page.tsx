"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast, useToast } from '@/components/ui/use-toast';
import googleIcon from '@/public/GoogleIcon.webp'
import logo from '@/public/logo.png'
import Image from 'next/image';

import React from "react";

import { cn } from "@/lib/utils";


const schema = z.object({
  email: z.string().nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getInfoOfRedirection = searchParams.get("redirected");
  const getUrl = searchParams.get("urlfrom");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (getInfoOfRedirection === "true") {
      toast({
        title: "Sign In",
        description: "Sign in to continue",
      });
    }
  }, [getInfoOfRedirection, toast]);

  const handleOnSubmit = async (data: FormData) => {
    setLoading(true);
    console.log(data)
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect email or password',
          variant: 'destructive',
        });
      } else {
        console.log(result.error)
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    else if (result?.url) {
      router.replace(getInfoOfRedirection === "true" && getUrl ? getUrl : '/');
    }
  };

  const su = () => {

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className=' w-full'>
          <Image className='w-20 m-[-10px]' src={logo} alt='Logo' />
        </div>
        <div className="text-2xl font-bold text-center mb-6">Sign In</div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="text"
              {...register('email')}
              className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
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

          <div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
        <div className='flex justify-center'>
          <a href='/sign-up'>New User? <u>Sign Up</u></a>
        </div>
      </div>
    </div>

  );
};


const SignIn = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
};

export default SignIn;


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-[2px] w-3/4 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
