module.exports = {
    /*
     * Generates a new random code for a game room.
     */
    createGameRoomCode: function () {
        let result = new Array(4);
        let characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
        for (let i = 0; i < 4; i++) {
            result[i] = characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result.join('');
    },

    /*
     * Generates a temporaty random user name.
     */
    createRandomUserName: function() {
        let size = Math.floor(Math.random() * 3 + 3); //random number between 3 and 5

        let result = new Array(size);
        let characters = '0123456789';
        for (let i = 0; i < size; i++) {
            result[i] = characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return 'User' + result.join('');
    }
};