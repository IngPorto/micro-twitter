const mongoose = require('mongoose')

const TwitSchema = mongoose.Schema({
    message: { type: String, required: true },
    image: String,
    owner: { type: mongoose.Schema.Types.ObjectId, required: true},
    likes: [mongoose.Schema.Types.ObjectId],
    shares: [mongoose.Schema.Types.ObjectId],
    comments: [mongoose.Schema.Types.ObjectId],
    parent: mongoose.Schema.Types.ObjectId,
    creation_time: Date,
    updated: Date,
    deleted: Boolean
})

module.exports = mongoose.model('Twit', TwitSchema) 