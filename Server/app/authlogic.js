const jwt = require("jwt-simple");
const models = require('../sequelize/models');
const User = models.User;

module.exports = {
    
    /*
     * Creates a JWT for given User object.
     */
    createJWT: function(obj){
        return jwt.encode(User.exportObject(obj, true), process.env.JWT_SECRET);
    }

};