const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 

const encrypt = (text) => {
    if (!text) return null;
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

const decrypt = (ciphertext) => {
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
