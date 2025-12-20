"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TranslateState {
    dictionary: Record<string, string>;
    lang: string;
    setDictionary: (dictionary: Record<string, string>) => void;
    setLang: (lang: string) => void;
    t: (key: string) => string;
}

export const useTranslateStore = create<TranslateState>((set, get): TranslateState => ({
    dictionary: {},
    lang: '',
    setDictionary: (dictionary) => set({ dictionary }),
    setLang: (lang: string) => set({ lang }),

    t: (key: string) => {
        const state = get();

        if (key in state.dictionary) {
            return state.dictionary[key];
        }

        console.error(`Could not find translation key: ${key}`);
        return key;
    },
}));
