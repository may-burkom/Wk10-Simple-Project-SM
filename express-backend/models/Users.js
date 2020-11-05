const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    visits: {
        type: Number,
        required: true
    }
})

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;