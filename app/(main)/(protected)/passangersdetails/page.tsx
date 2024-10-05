
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

import whatsapp from "@/public/whatsapp.png"
import { Switch } from '@mui/material';
import MbPassangerDetails from '@/components/mobileComponents/MbPassangerDetails';
import LpPassangerDetails from '@/components/laptopComponents/LpPassangerDetails';

const page = () => {
  return (
    <div>
      <MbPassangerDetails />
      <LpPassangerDetails />
    </div>
  )
}

export default page
