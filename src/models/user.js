const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose?.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is invalid");
            }
        }
    },
    photoUrl:{
        type: String,
        validate(value){
           if(!validator.isURL(value)){
            throw new Error("Enter a valid image url" + value)
           }
        },
        default: ""
    }
    
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;