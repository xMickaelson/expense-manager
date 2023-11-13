const { encode } = require("../jwt/token");

function hello(req, res) {
  console.log(req.userId)
  return res.send("Hello User");
}

function token(req, res) {
  return res.send(encode('thisismyid'))
}

/**
 * Export all functions from this file
 */
module.exports = {
  hello,
  token
};
