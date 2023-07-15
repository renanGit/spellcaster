import { defineStore } from 'pinia';
import { type Lobby } from "../types"

export const useLobbyStore = defineStore("LobbyStore", {
    state: () => {
        return {
            lobby: {} as Lobby,
        };
    },
    // getters
    
    // actions
});