const express = require("express");
const userController = require('./../Controllers/userController');
const authController = require('./../Controllers/authController');
const passwordController=require('./../Controllers/passwordController');
const ContactUsController=require('./../Controllers/ContactUsController');
const router = express.Router();
const fs = require("fs");

const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword',passwordController.forgotPassword);
router.post('/sendMessage/:encryptedData',ContactUsController.SendMessage);
router.get('/getAllMessages',ContactUsController.GetAllMessages)
router.route("/:encryptedData").patch(passwordController.updatePassword);
router.get('/allusers', userController.getAllUsers);
router.post('/createuser', userController.createUser);
router.get('/user/:id', userController.getUniqueUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;