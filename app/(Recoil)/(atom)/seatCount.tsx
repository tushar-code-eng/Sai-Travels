import {atom,selector} from "recoil"
import jsonObject from "@/Data.json"

const {AllSleepers} = jsonObject

export const seatCountAtom = atom({
    key:"seatCountAtom",
    default:0
})