const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true},
    slug: String,
    description: String,
    followers: [mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId],
    photo: String,
    password: { type: String, required: true},
    creation_time: Date,
    deleted: Boolean
})

module.exports = mongoose.model("User", UserSchema)