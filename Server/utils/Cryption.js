const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const key = crypto.randomBytes(32);
const key = Buffer.from(process.env.KEY, "hex");
// const iv = crypto.randomBytes(16);
const iv = Buffer.from(process.env.IV, 'hex');


exports.encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
 }
 


 exports.decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
 }
 
// var hw = encrypt("Welcome to Tutorials Point...")
// console.log("This is  encrypted: ",hw)
// console.log(decrypt(hw))

