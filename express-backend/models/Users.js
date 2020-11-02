const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    visits: {
        type: Number
    }
})

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;