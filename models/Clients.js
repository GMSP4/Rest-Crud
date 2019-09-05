const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientsSchema = new Schema({
    name:{
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    }
})



module.exports = mongoose.model("Clients", clientsSchema)