'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { addSleeperSchema } from '@/ZodSchemas/addSleeperSchema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';

const AddSleeper = () => {

    const form = useForm<z.infer<typeof addSleeperSchema>>({
        resolver: zodResolver(addSleeperSchema),
        defaultValues: {
            sleeperName: '',
            sleeperPrice: undefined,
            busNumber: undefined
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: z.infer<typeof addSleeperSchema>) => {
        console.log('hello')
        setIsSubmitting(true)
        try {
            const res = await axios.post('/api/add-sleeper', data)
            toast({
                title: 'Success',
                description: res.data.message
            })
        } catch (err) {
            console.log('Error during adding a sleeper', err)
            const axiosError = err as AxiosError
            toast({
                title: 'Adding Sleeper Failed',
                variant: 'destructive'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="sleeperName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sleeper Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sleeper Name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sleeperPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sleeper Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sleeper Price" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="busNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bus Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bus Number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AddSleeper
