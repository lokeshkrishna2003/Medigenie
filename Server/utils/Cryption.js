const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.KEY || !process.env.IV) {
  throw new Error("Missing KEY or IV in environment variables");
}

const key = Buffer.from(process.env.KEY, "hex");
const iv = Buffer.from(process.env.IV, "hex");

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

exports.decrypt = (text) => {
  const inputIV = Buffer.from(text.iv, "hex");
  const encryptedText = Buffer.from(text.encryptedData, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, inputIV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};