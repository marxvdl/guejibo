module.exports = {

    readyUsersInGameRoom: {},

    /*
     * Generate a new random code for a game room.
     */
    createGameRoomCode: function () {
        let result = new Array(5);
        let characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
        for (let i = 0; i < 4; i++) {
            result[i] = characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result.join('');
    },

    /*
     * Sets a waiting player status in a game room as ready.
     */
    setPlayerReady: function (userId, gameroomId) {
        if (!(gameroomId in this.readyUsersInGameRoom))
            this.readyUsersInGameRoom[gameroomId] = [];

        let readyList = this.readyUsersInGameRoom[gameroomId];
        if(readyList.indexOf(userId) == -1)
            readyList.push(userId);
    }
};