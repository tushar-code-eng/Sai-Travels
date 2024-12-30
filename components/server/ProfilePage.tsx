"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "framer-motion";

import { useSession } from "next-auth/react";

import { Session } from "next-auth";

import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export function ProfilePage() {

    const { toast } = useToast()

    const [changesMade, setChangesMade] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")

    const { data: session, status, update } = useSession();

    const handleSubmit = async () => {
        const email = session?.user.email

        await update({
            ...session,
            user: {
                ...session?.user,
                fullName: firstName + ' ' + lastName
            }

        })

        const res = await axios.post('/api/update-profile', { fullName: firstName + ' ' + lastName, email })
        toast({
            title: res.data.title,
            description: res.data.message
        })
    };

    const handleSubmitPassword = async () => {
        const email = session?.user.email
        const res = await axios.post('/api/update-password', { currentPass, newPass, email })
        toast({
            title: res.data.title,
            description: res.data.message
        })
    }

    return (
        <div className="my-5 lg:max-w-4xl w-full m-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <div className="flex justify-between items-center w-full" >
                <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
                    Edit Profile
                </h2>

                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden text-white text-xl font-bold">
                    <img src={session?.user.image} alt="" />
                </div>
            </div>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">

                    <LabelInputContainer>
                        <Label htmlFor="FullName">Full name</Label>
                        <Input onChange={(e) => { setChangesMade(true); setLastName(e.target.value) }} defaultValue={session?.user.name} id="lastname" placeholder="Durden" type="text" />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input defaultValue={session?.user.email} className="cursor-not-allowed" disabled id="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input defaultValue={"+91-"+ session?.user.phone} className="cursor-not-allowed" disabled id="phone" placeholder="" type="text" />
                </LabelInputContainer>

                {
                    changesMade &&
                    <Button
                        className=" w-full m-auto relative group/btn block rounded-md font-medium "
                        type="submit"
                    >
                        Save Changes
                        <BottomGradient />
                    </Button>
                }
            </form>
            <div className="mb-4">
                <Modal>
                    <ModalTrigger className=" rounded-xl hover:border-black border-2 group/modal-btn">
                        <div className="">
                            Change Password
                        </div>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent className="w-full">
                            <form onSubmit={handleSubmitPassword}>
                                <div className=" gap-4 w-full items-center justify-center flex flex-col">
                                    <LabelInputContainer >
                                        <Label htmlFor="phone">Current Password</Label>
                                        <Input onChange={(e) => { setCurrentPass(e.target.value) }} id="phone" placeholder="********" className="border-2 hover:border rounded-xl hover:border-black" type="password" />
                                    </LabelInputContainer>

                                    <LabelInputContainer>
                                        <Label htmlFor="phone">New Password</Label>
                                        <Input onChange={(e) => { setNewPass(e.target.value) }} id="phone" placeholder="********" className="border-2 hover:border rounded-xl hover:border-black" type="password" />
                                    </LabelInputContainer>
                                    <Button type="submit" className="px-6">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </ModalContent>

                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
