import { defineStore } from 'pinia';
import { type Room } from "../types"

export const useRoomStore = defineStore("RoomStore", {
    state: () => {
        return {
            room: {} as Room,
        };
    },
    // getters
    
    actions: {

    },
});