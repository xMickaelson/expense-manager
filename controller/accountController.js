const httpStatus = require("http-status");
const Account = require("../model/account");

/**
 * Endpoint to get all account
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllAccount(req, res) {
  const userId = req.body.userId;
  const allAccounts = await Account.find({ userId: userId });
  return res.status(httpStatus.OK).send({
    message: "",
    data: allAccounts.map((a) => ({
      id: a.id,
      name: a.name,
      balance: 0, // To be calculated
    })),
  });
}

/**
 * Endpoint to create a account
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createAccount(req, res) {
  const { name, userId } = req.body;

  if (!name || !userId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const newAccount = new Account({ name, userId });
  await newAccount.save();

  return res.status(httpStatus.OK).send({
    message: "Account created sucessfully",
    data: { id: newAccount.id },
  });
}

/**
 * Endpoint to update a account
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateAccount(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const account = await Account.findById(id);

  account.name = name;

  await account.save();

  if (!account)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Account not found", data: null });

  return res.status(httpStatus.OK).send({
    message: "Account updated sucessfully",
    data: { id: account.id },
  });
}

/**
 * Endpoint to delete a account
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteAccount(req, res) {
  const { id } = req.params;

  const account = await Account.findById(id);

  if (!account)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Account not found", data: null });

  await account.deleteOne();

  return res.status(httpStatus.OK).send({
    message: "Account deleted sucessfully",
    data: null,
  });
}

module.exports = {
  getAllAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
