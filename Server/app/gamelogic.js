module.exports = {
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
    }
};