const bcrypt = require("bcrypt");
import { getHashedPasswordFromDB } from "./user";

function verifyPassword(hashedPW, password) {
  if (!hashedPW) {
    return Promise.reject(new Error("INVALID CREDENTIALS"));
  }

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPW, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

function authenticateUser(username, password) {
  return getHashedPasswordFromDB(username).then((hashedPW) =>
    verifyPassword(hashedPW, password)
  );
}

module.exports = {
  authenticateUser,
};
