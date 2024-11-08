import {atom,selector} from "recoil"
import jsonObject from "@/Data.json"
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

const {AllSleepers} = jsonObject

export const seatCountAtom = atom({
    key:"seatCountAtom",
    default:0,
})