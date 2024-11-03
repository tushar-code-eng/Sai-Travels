import { atom, selector } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export interface selectinterface {
    [key: string]: boolean
}

export const selectAtom = atom<selectinterface>({
    key: "selectAtom",
    default: {} as selectinterface
})