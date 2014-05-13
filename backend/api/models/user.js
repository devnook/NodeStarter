/**
 * @file User schema for MongoDb.
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        openId       : String,
        token        : String,
        email        : String,
        name         : String
    },
    profile: {
        displayName  : String,
        email : String
    }
});

/**
 * Generates a hash for password.
 * @param  {String} password Raw password.
 * @return {String} Hashed password.
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checking if password is the same as the user's password.
 * @param  {String} password
 * @return {Boolean} whether the password is valid.
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);