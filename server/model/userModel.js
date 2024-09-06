import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    description:{
        type: String,
        required: true

    }

})


export default mongoose.model("User", userSchema);