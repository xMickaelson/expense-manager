const httpStatus = require("http-status");
const Budget = require("../model/budget");

/**
 * Endpoint to get all categories
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllBudget(req, res) {
  const userId = req.body.userId;
  const allBudgets = await Budget.find({ userId: userId }).select({
    _id: 0,
    userId: 0,
  });
  return res.status(httpStatus.OK).send({
    message: "",
    data: allBudgets.map((b) => ({
      ...b,
      id: b.id,
    })),
  });
}

/**
 * Endpoint to create a budget
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createBudget(req, res) {
  const { id } = req.params;
  const { limit, month, year, userId } = req.body;

  if (!userId || !limit || !month || !year)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const newBudget = new Budget({ limit, month, year });
  await newBudget.save();

  return res.status(httpStatus.OK).send({
    message: "Budget created sucessfully",
    data: { id: newBudget.id },
  });
}

/**
 * Endpoint to update a budget
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateBudget(req, res) {
  const { id } = req.params;
  const { name, emoji } = req.body;

  if (!name || !emoji)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const budget = await Budget.findById(id);

  budget.name = name;
  budget.emoji = emoji;

  await budget.save();

  if (!budget)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Budget not found", data: null });

  return res.status(httpStatus.OK).send({
    message: "Budget updated sucessfully",
    data: { id: budget.id },
  });
}

/**
 * Endpoint to delete a budget
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteBudget(req, res) {
  const { id } = req.params;

  const budget = await Budget.findById(id);

  if (!budget)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Budget not found", data: null });

  await budget.deleteOne();

  return res.status(httpStatus.OK).send({
    message: "Budget deleted sucessfully",
    data: null,
  });
}

module.exports = {
  getAllBudget,
  createBudget,
  updateBudget,
  deleteBudget,
};