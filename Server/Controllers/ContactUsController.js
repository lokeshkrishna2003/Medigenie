const catchAsync = require("../utils/catchAsync");
const Message=require('../Models/reviewModel');
const User = require('../Models/userModel');
const Cryption = require('../utils/Cryption');
const SendMail=require('../utils/SendMail');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


exports.SendMessage=catchAsync(async(req,res)=>{
    const text = {
        "iv": Buffer.from(process.env.IV, 'hex'),
        "encryptedData": req.params.encryptedData
    }
    const user_id = Cryption.decrypt(text);
    const userDetails = await User.findById(user_id);

    const newReview =await Message.create({
        userId:user_id,
        name: req.body.name,
        email: userDetails.email,
        message:req.body.message,

    });
    const otp=0;
    SendMail(userDetails.email,otp,req.body.name,"feedback");

    res.status(201).json({
        status: 'success',
        data:{
            review:newReview
        }
    })
})

exports.GetAllMessages=catchAsync(async(req,res)=>{
  
        const messages = await Message.find();
        res.status(200).json({
          status: "success",
          results: messages.length,
          data: {
            messages,
          },
        });
    
})