import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const d = new Date()
const nextDate = d.getDate()

const temp = new Date()
temp.setDate(nextDate + 1)

const allMonths: string[] = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const alldays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const PickUpPointAtom = atom<string>({
    key: 'PickUpPointAtom',
    default: "Sector 22B Chandigarh"
})

export const DropOffPointAtom = atom<string>({
    key: 'DropOffPointAtom',
    default: "Place 1 in Jammu"
})

export const DayAtom = atom<string>({
    key: 'DayAtom',
    default: alldays[d.getDay()]
})

export const MonthAtom = atom<string>({
    key: 'MonthAtom',
    default: allMonths[d.getMonth()]
})

export const DateAtom = atom<string>({
    key: 'DateAtom',
    default: d.getDate().toString()
})

export const YearAtom = atom<string>({
    key: 'YearAtom',
    default: d.getFullYear().toString()
})

export const NextDayAtom = atom<string>({
    key: 'NextDayAtom',
    default: alldays[temp.getDay()]
})

export const NextMonthAtom = atom<string>({
    key: 'NextMonthAtom',
    default: allMonths[temp.getMonth()]
})

export const NextDateAtom = atom<string>({
    key: 'NextDateAtom',
    default: temp.getDate().toString()
})

export const NextYearAtom = atom<string>({
    key: 'NextYearAtom',
    default: d.getFullYear().toString()
})

export const noOfPassangersAtom = atom({
    key: "noOfPassangersAtom",
    default: 0
})

export const totalPriceAtom = atom({
    key: "totalPriceAtom",
    default: 0
})