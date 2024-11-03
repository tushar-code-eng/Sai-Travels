import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const SleeperDateAtom = atom({
    key: 'SleeperDateAtom',
    default: new Date(),
    effects_UNSTABLE: [persistAtom]
})
