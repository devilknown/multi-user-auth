const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim = true,
        unique: true,
        required: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: "subscriber"
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, { timestamps: true });


// virtual
userSchema.virtual("password")
.set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hash_password = this.encryptPassowrd(password);
})
.get(function() {
    return this._password;
});


// methods
userSchema.methods = {
    authenticate: function(plainPass) {
        return this.encryptPassowrd(plainPass) === this.hash_password; 
    },
    encryptPassowrd: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return "";
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random() + "");
    }
}

module.exports = mongoose.model('User', userSchema);