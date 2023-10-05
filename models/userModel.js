const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is too weak')
    }

    //pre-existing user check
    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('Email already in use');
    }

    //hash users password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create user
    const user = await this.create({ email, password: hash });

    //return user
    return user;
}

//static login method
userSchema.statics.login = async function(email, password) {
    
    //validation
    if(!email || !password) {
        throw Error('All fields must be filled');
    };

    //Try to find existing user by email entered
    const user = await this.findOne({ email });

    //Throw error if user is not found
    if(!user) {
        throw Error('Incorrect Username/Password');
    };

    //Compare password entered with user password
    const match = await bcrypt.compare(password, user.password);

    //Throw error if passwords don't match
    if(!match) {
        throw Error('Incorrect Username/Password')
    }

    //return user
    return user;
}

module.exports = mongoose.model('User', userSchema);