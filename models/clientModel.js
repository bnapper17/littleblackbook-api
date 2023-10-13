const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        minLength: 12,
        maxLength: 12,
        required: true
    },
    address: {
        type: String
    },
    geolocation: {
        type: Object
    },
    description: {
        type: String
    },
    bid: {
        type: Number
    },
    emergency: {
        type: Boolean
    },
    contract: {
        type: Boolean
    },
    user_id: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean
    }
}, {timestamps: true})

module.exports = mongoose.model('Client', clientSchema);