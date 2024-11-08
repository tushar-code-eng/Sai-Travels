"use client"

import LOGO from "@/public/IMG_0863.png"
import Image from 'next/image';

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';

import { signIn } from 'next-auth/react';

import googleIcon from '@/public/GoogleIcon.webp'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { useRecoilState } from "recoil";
import { openSideBarAtom } from "@/app/(Recoil)/(atom)/OpenSideBr";
import { Session } from "next-auth";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Navbar = () => {

  const { data: session, status } = useSession() as { data: Session | null; status: string };

  const router = useRouter()

  const handleClick = () => {
    router.push("/")
  }


  return (
    <div className="p-3 w-full m-auto flex items-center justify-between bg-white text-black sticky top-0 z-10 shadow-md rounded-lg lg:w-full lg:px-8 lg:top-1 ">
      <div className='flex cursor-pointer w-28 justify-center items-center sm:w-20 ' onClick={() => handleClick()}>
        <div className="flex font-medium items-center">
          <Image src={LOGO} alt="LOGO" />
          <span className="mr-1 hidden sm:block">SAI</span>
          <span className=" hidden sm:block">TRAVELS</span>
        </div>
      </div>
      <div className=" hidden justify-center items-center gap-20 lg:flex">
        <div >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-md relative overflow-hidden transition-colors duration-500 ease-in-out group">
                <span className="relative z-10">Contact</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FDA0A8] to-[#FA71B7] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-[700px] w-[90%] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  <div className=" text-2xl">Contact Us</div>
                </DialogTitle>
                <DialogDescription>
                  <div className="text-base">
                    We&apos;re here to help! If you have any questions, feedback, or need assistance, please don&apos;t hesitate to reach out.
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-1 py-4 text-sm">
                <div>Phone: +91-6280918368</div>
                <div>Email: support@saitravels.com</div>
                <div>Office Address: SCO-123, Cabin no. 3, Sector 22 B <br /> Chandigarh, 160022, India</div>
              </div>
              <div>
                <div>
                  Office Hours:
                </div>
                <div>
                  <div className="text-sm">Monday - Sunday: 10:00 AM - 10:00 PM</div>
                </div>
              </div>
              <div>
                FAQs
              </div>

            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-md relative overflow-hidden transition-colors duration-500 ease-in-out group">
                <span className="relative z-10">About Us</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#FDA0A8] to-[#FA71B7] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-[700px] w-[90%] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  <div className=" text-2xl">About Us</div>
                </DialogTitle>
              </DialogHeader>
              <div>
                <div>
                  <b>Sai Travels</b>
                </div>
                <div>
                  <div className="text-sm">Welcome to SAI TRAVELS, your trusted partner for comfortable and reliable bus journeys from Chandigarh to Jammu. Founded with a passion for making travel convenient and enjoyable, we have been serving our customers with dedication and excellence.</div>
                </div>
              </div>
              <div>
                <div>
                  <b>Our Mission</b>
                </div>
                <div>
                  <div className="text-sm">At SAI TRAVELS, our mission is to provide safe, affordable, and timely transportation solutions for our customers. We strive to make every journey pleasant and hassle-free, ensuring that our passengers reach their destinations comfortably.</div>
                </div>
              </div>
              <div>
                <div>
                  <b>What We Offer</b>
                </div>
                <div>
                  <div className="text-sm">We specialize in sleeper bus services, offering modern and well-maintained buses that guarantee a comfortable ride. With easy booking options and top-notch customer service, we make travel planning simple and stress-free.</div>
                </div>
              </div>
              <div>
                <div>
                  <b>Our Values</b>
                </div>
                <div>
                  <div className="text-sm">
                    <ul >
                      Customer Satisfaction: We prioritize our passenger&apos;s comfort and safety above all else.
                    </ul>
                    <ul>
                      Reliability: We are committed to providing punctual and dependable services.
                    </ul>
                    <ul>
                      Integrity: We operate with transparency and honesty in all our dealings.
                    </ul>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="text-slate-400 text-sm text-center">
                  Thank you for choosing SAI TRAVELS. We look forward for being a part of your travel adventures and making every trip a memorable one.
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="">
        {status === 'authenticated' ? (
          <div className="flex items-center space-x-4 py-1 mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer outline-none">
                <div className="WOW text-lg font-semibold">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.fullName || 'Profile Picture'}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      {session?.user?.fullName ? session.user.fullName.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute right-0">
                <DropdownMenuItem>
                  <div className="px-2">{session?.user?.name || session?.user.fullName}</div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="px-2">{session?.user?.email}</div>
                </DropdownMenuItem>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-1 h-[1px] w-full" />

                <DropdownMenuItem>
                  <Button onClick={() => { router.push('/profile') }} className="flex items-center justify-start gap-1 rounded-md cursor-pointer font-medium text-base w-full px-2 py-1">
                    <span><PersonOutlineIcon /></span>
                    <span>Profile</span>
                  </Button>
                </DropdownMenuItem>


                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-1 h-[1px] w-full" />

                <DropdownMenuItem>
                  <Button
                    onClick={() => signOut()}
                    className="py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-center"
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : <div className="flex gap-4">

          <Button className=" hidden sm:block bg-gradient-to-r from-[#FDA0A8] to-[#FA71B7] font-bold text-base hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href="/sign-in">Sign In</Link>
          </Button>

          <Button
            onClick={() => {
              signIn('google',
                { callbackUrl: '/', }
              )
            }}
            className="text-center p-2 text-orange-600 bg-transparent border-2 border-orange-600 font-bold text-base hover:bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Google
            <Image className='w-8' src={googleIcon} alt="Google" />
          </Button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar


