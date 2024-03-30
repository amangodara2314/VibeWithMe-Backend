const Cryptr = require("cryptr");
const cryptr = new Cryptr("vibewithme2314");

const encryptPassword = (pass) => {
  return cryptr.encrypt(pass);
};

const decryptPassword = (pass) => {
  return cryptr.decrypt(pass);
};

module.exports = { encryptPassword, decryptPassword };
