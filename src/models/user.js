const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    phone: {
        type: String,
        required:true
    },
    adress: [
        {
            type: String,
            required:true
        }
    ],    
    password: {
        type: String,
        required: true
      },
    rol: [
        {
            ref: "Rol",
            type: Schema.Types.ObjectId 
        }
    ]
});


module.exports = mongoose.model('User', userSchema);
