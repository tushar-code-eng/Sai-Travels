import {atom,selector} from "recoil"
import jsonObject from "@/Data.json"
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

interface allSleepers {
    [key:string]:boolean
}

const {AllSleepers} = jsonObject

export const greenAtom = atom({
    key:"greenAtom",
    default:AllSleepers as allSleepers
})

