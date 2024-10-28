<<<<<<< HEAD
import { atom, selector } from "recoil"

import { useSession } from 'next-auth/react'

const { data: session } = useSession()

export const passangerNamesAtom = atom({
    key: "passangerNamesAtom",
    default: [{ fullName: "", age: "", gender: "" }]
})


export const contactSelector = selector({
    key: 'contactSelector',
    get: async () => {
        if (session && session.user) {
            return {
                email: session.user.email || '',
                phone: session.user.phone || '', 
            };
        }
        return { email: '', phone: '' };
    },
});

export const contactAtom = atom({
    key: "contactAtom",
    default: contactSelector
})


=======
import { atom, selector } from "recoil"

import { useSession } from 'next-auth/react'

export const passangerNamesAtom = atom({
    key: "passangerNamesAtom",
    default: [{ fullName: "", age: "", gender: "" }]
})


export const contactSelector = selector({
    key: 'contactSelector',
    get: async () => {
        const { data: session } = useSession()
        if (session && session.user) {
            return {
                email: session.user.email || '',
                phone: session.user.phone || '', // Ensure that the session includes phone
            };
        }
        return { email: '', phone: '' };
    },
});

export const contactAtom = atom({
    key: "contactAtom",
    default: contactSelector
})


>>>>>>> a3c0ee073f475d5e35ac59955f3c5cf72b6af425
