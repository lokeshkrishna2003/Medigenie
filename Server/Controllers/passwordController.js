const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Cryption = require('./../utils/Cryption');
const bcrypt = require('bcryptjs');
const SendMail = require('./../utils/SendMail');
const User = require('./../Models/userModel');
const generateOTP = require('./../utils/generateOTP');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


exports.updatePassword = catchAsync(async (req, res,next) => {
    try {
        const text = {
            "iv": Buffer.from(process.env.IV, 'hex'),
            "encryptedData": req.params.encryptedData
        }

        const user_id = Cryption.decrypt(text);


        const newPassword = await bcrypt.hash(req.body.password, 12);

        const user = await User.findByIdAndUpdate(user_id, { "password": newPassword }, {
            new: true,
            runValidators: true,
        });


        const userDetails = await User.findById(user_id);
        const otp = generateOTP();
        SendMail(userDetails.email, otp, userDetails.name, "changePassword");

        res.status(200).json({
            status: "success",
            data: {
                user,
            }
        });
    } catch (err) {
        console.error("Unable to update password:", err); // Log the error
        res.status(400).json({
            status: "error",
            message: "Unable to update password",
        });
    }
});


exports.forgotPassword = async (req, res,next) => {
    const {email}=req.body;
    console.log(email);
    try {

        const user = await User.findOne({email});
        console.log(user);
        if (user) {
            const otp = generateOTP();
            console.log(otp);
            SendMail(user.email, otp, user.name, "forgotPassword");
            const user_id = Cryption.encrypt((user._id).toString());
            console.log(user_id);

            res.status(200).json({
                status: "success",
                data: {
                    "otp":otp,
                    "user_id":user_id,
                }
            });
        } 
        if(!user){
            res.status(401).json({
                status: "failed",
                message: "user doesnt exist!!"

            });
        }


    } catch (err) {
        console.error("Unable to update password:", err); // Log the error
        res.status(400).json({
            status: "error",
            message: "Unable to update password",
        });
    }
};


