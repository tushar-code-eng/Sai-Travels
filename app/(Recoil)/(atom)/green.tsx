import {atom,selector} from "recoil"
import jsonObject from "@/Data.json"

interface allSleepers {
    [key:string]:boolean
}

const {AllSleepers} = jsonObject

export const greenAtom = atom({
    key:"greenAtom",
    default:AllSleepers as allSleepers
})

