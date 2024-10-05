import { SleeperInterface } from "@/models/Sleeper";
import { atom } from "recoil"

export const AllSleepersAtom = atom<SleeperInterface[]>({
    key: 'AllSleepersAtom',
    default: [],
});


export const LowerDoubleAtom = atom<SleeperInterface[]>({
    key: 'LowerDoubleAtom',
    default: [],
});
export const LowerSingleAtom = atom<SleeperInterface[]>({
    key: 'LowerSingleAtom',
    default: [],
});
export const UpperDoubleAtom = atom<SleeperInterface[]>({
    key: 'UpperDoubleAtom',
    default: [],
});
export const UpperSingleAtom = atom<SleeperInterface[]>({
    key: 'UpperSingleAtom',
    default: [],
});