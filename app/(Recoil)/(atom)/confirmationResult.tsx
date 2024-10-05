import { ConfirmationResult } from "firebase/auth"
import {atom,selector} from "recoil"

export const confirmationResultAtom = atom<ConfirmationResult | null>({
    key:"confirmationResult",
    default:null
})

