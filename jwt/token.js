const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

/**
 * A function which returns a token with encoded id
 * @param {string} id
 */
function encode(id) {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "1 day" });
}

/**
 * decodes the token and returns the payload
 * @param {string} token
 * @returns {Object}
 */
function decode(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw Error("Token Expired");
    } else if (err instanceof JsonWebTokenError) {
      throw Error("Invalid Token");
    } else throw Error("Error Occured");
  }
}

module.exports = { encode, decode };
