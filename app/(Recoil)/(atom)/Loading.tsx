import {atom,selector} from "recoil"


export const loadAtom = atom<boolean>({
    key:"loadAtom",
    default:false
})

