function hello(req, res) {
  return res.send("Hello User");
}

/**
 * Export all functions from this file
 */
module.exports = {
  hello,
};
