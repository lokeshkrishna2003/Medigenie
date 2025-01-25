const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please tell us your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please provide us your password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide us your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userpassword,
) {
  return await bcrypt.compare(candidatePassword, userpassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
