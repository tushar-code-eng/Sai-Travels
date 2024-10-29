
"use client"

import LOGO from "@/public/logo.png"
import Image from 'next/image';

import { signOut, useSession, } from "next-auth/react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Loader2 } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

const Navbar = () => {

  const { data: session, status } = useSession();
  console.log(session)

  const [isOpen, setIsOpen] = useState(false);

  const myloader = () => {
    return "loading..."
  }

  const router = useRouter()

  const handleClick = () => {
    router.push("/")
  }

  return (
    <div className=" flex items-center justify-between sm:p-1 bg-white text-black sticky top-0 z-10 sm:border-b-2 border-b-4 shadow-sm">
      <div className='cursor-pointer sm:w-20 w-24 items-start justify-start' onClick={() => handleClick()}>
        <Image src={LOGO} alt='LOGO' />
      </div>
      <div className="flex justify-center items-center gap-10">
        <div >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="roundede-md">Contact</Button>
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
        <div >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="roundede-md">About Us</Button>
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
        <div>
          {status === 'authenticated' ? (
            <div className="flex items-center space-x-4 px-4 py-1 mx-auto">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-none">
                  <div className="WOW text-lg font-semibold">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'Profile Picture'}
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
                    <div>{session?.user?.name}</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div>{session?.user?.email}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      onClick={() => signOut()}
                      className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : <Button asChild>
            <Link href="/sign-in">SignIn</Link>
          </Button>}
        </div>
      </div>
    </div>
  )
}

export default Navbar


