"use client"
import Image from "next/image"
import busIamge from "@/public/Dp.png"

import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";

interface LpdescProps {
    scrollToTarget: () => void
}

import Typewriter from 'typewriter-effect';



const Lpdesc = ({ scrollToTarget }: LpdescProps) => {

    return (
        <div className="lg:flex w-full">
            <div className="hidden lg:block" >
                <CardContainer className="-mt-16">
                    <CardItem translateZ="100" className="w-full">
                        <Image
                            src={busIamge}
                            height="600"
                            width="800"
                            className="w-full object-contain rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                </CardContainer>
            </div>
            <div className=" p-4 justify-center w-full flex flex-col items-center xl:w-2/3 xl;p-6 xl:ml-8">
                <div className="mt-10">
                    <div className="text-7xl text-center xl:text-start flex sm:text-8xl font-semibold justify-center items-center bg-gradient-to-r from-[#3D3B6C] to-[#7773D2] text-transparent bg-clip-text font-quicksand">
                        SAI TRAVELS
                    </div>
                    <div className="text-center  flex w-full items-center justify-center bg-clip-text text-orange-500 text-4xl font-bold">
                        <Typewriter
                            options={{
                                strings: ['Daily Bus Service', 'Trusted By 1000+ Travellers', '20+ Years Of Travelling'],
                                autoStart: true,
                                loop: true,
                                deleteSpeed:50,
                            }}
                        />
                    </div>
                    <div className="text-center mt-10 w-full text-Gray-700 text-lg">
                        <div className=" m-auto justify-center items-center w-[80%]">
                            Experience daily comfort and convenience with our premium bus service from <span className="text-orange-600">Chandigarh</span> to <span className="text-orange-600">Jammu</span>. Enjoy reliable transportation  and exceptional amenities. Book now for a hassle-free journey.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-20 gap-1">

                    <Modal>
                        <ModalTrigger className="bg-gradient-to-r from-orange-500 to-orange-700 p-5 px-10 text-lg font-bold rounded-xl text-blueGray-800 transition-transform ease-in-out duration-200 transform hover:scale-110 group/modal-btn shadow-lg">
                            <div onClick={scrollToTarget} className="  cursor-pointer text-white group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                                BOOK NOW
                            </div>
                            <div onClick={scrollToTarget} className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                                🚌
                            </div>
                        </ModalTrigger>
                        <p className="font-bold text-[#3D3B6C]">Choose your travel date now!</p>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default Lpdesc
