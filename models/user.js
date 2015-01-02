var bcrypt   = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    crypto = require('crypto');
    Schema = mongoose.Schema;
    
var UserSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
        username     : String,
        token        : { type: String,  required: true },
        verified     : { type: Boolean, default:false  },
        resetPasswordToken: String,
        resetPasswordExpires: Date
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
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/*compile schema to a model*/
var User = mongoose.model('user', UserSchema);
console.log('in the mode');
/*expose this variable to other js file */
module.exports = User;
