import {atom,selector} from "recoil"

export interface selectinterface {
    [key:string]:boolean
}

export const selectAtom = atom<selectinterface>({
    key:"selectAtom",
    default:{} as selectinterface
})