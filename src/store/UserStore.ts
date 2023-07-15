import { defineStore } from 'pinia';
import { type User } from '../types'

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            user: {} as User,
        };
    },
    // getters

    // actions
});