export class GlobalConstants {
    public static readonly TIMES = {
        // How often a player will send a "I'm here" message 
        // while waiting for a game to start
        SHOUT_IM_HERE_INTERVAL: 800, //must be the same value in gameslib.ts

        // How long the host will wait for the "I'm here" message 
        // before considering that the player is offline
        WAIT_FOR_PLAYER_SHOUT: 1200,

        // How often the host will check for "I'm here" messages
        CHECK_PLAYERS_ONLINE_INTERVAL: 1000,
    };
}