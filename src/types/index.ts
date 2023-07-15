export interface Lobby {
    roomIds: String[]
}

export interface Room {
    // Some random string, also acts as the url key
    roomId: "",
    // All users that currently in the room
    users: User[],
    userSessions: UserSession[],
    // Game duration
    gameStartTime: Date,
    // If no users present, room automatically is cleaned up within time interval?
    creationTime: Date,
};

export interface User {
    userName: "",
    userGameProps: GameProps,
};

// ----------------------
// ---- Non exported ----
// ----------------------

// Game properties for a user
interface GameProps {
    // Current health total
    userLife: 40,
    // User's turn
    isTurn: false,
    // In case of rejoining, we dont want to reset?
    previousRoomId: ""
};

// When connected, the room will hold details about the session
interface UserSession {
    isCaller: false,
    localStream: MediaStream,
    pc: RTCPeerConnection,
    // The time duration that the user was in the session
    joinTime: Date
};