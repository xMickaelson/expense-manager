const httpStatus = require("http-status");
const tokenService = require("../jwt/token");

/**
 * A middleware function which authenticates the user through extracting token from header
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authentication(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "This request is not authorized", data: null });

  try {
    const userDetails = tokenService.decode(token);
    req.body["userId"] = userDetails.id;
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: e.message, data: null });
  }
}

module.exports = authentication;
