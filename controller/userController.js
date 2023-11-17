const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { encode } = require("../jwt/token");
const User = require("../model/user");

/**
 * Compares hashed password stored in database and if successfull returns a jwt token
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
async function login(req, res) {
  const basicAuth = (req.headers.authorization || "").split(" ")[1] || "";
  const [email, password] = Buffer.from(basicAuth, "base64")
    .toString()
    .split(":");

  const user = await User.findOne({ email: email });

  if (!user)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "User not found", data: null });

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (!isAuthenticated)
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Incorrect Password", data: null });

  return res.status(httpStatus.OK).send({
    message: "Login Succesfully",
    data: { token: encode(user.id.toString("base64")), name: user.name },
  });
}

/**
 * Registers the user with details in request body
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing user details", data: null });

  const existingUser = await User.findOne({ email: email });

  if (existingUser)
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: "User already exists", data: null });

  const hash = bcrypt.hashSync(password);

  const user = new User({ name: name, email: email, password: hash });

  try {
    await user.save();
    return res.send({ message: "User registered succesfully", data: null });
  } catch (e) {
    return res.send({
      message: "Error Occurred while registering",
      data: null,
    });
  }
}

/**
 * Endpoint for verifying the token
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns
 */
async function verify(_, res) {
  return res
    .status(httpStatus.OK)
    .send({ message: "Token is valid", data: null });
}

/**
 * Export all functions from this file
 */
module.exports = {
  login,
  register,
  verify,
};
