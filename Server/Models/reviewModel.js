const mongoose = require('mongoose');
const validator = require('validator');
const messageSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name: {
        type: String,
        required: [true, 'please tell us your name'],
    },
    email: {
        type: String,
        required: [true, 'please tell us your email address'],
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email'],
     
    },
    
    message: {
        type: String,
        required: [true, 'please tell us your message'],
        lowercase: true,
    },
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
