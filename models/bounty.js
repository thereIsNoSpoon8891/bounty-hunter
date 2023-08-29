const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Bounty blueprint

const bountySchema = new Schema({
    firstName: String,
    lastName: {
        type: String,
        required: true
    },
    living: Boolean,
    amount: {
        type: Number,
        required: true
    },
    type: String,
    imageUrl: String
})

module.exports = mongoose.model("Bounty", bountySchema)