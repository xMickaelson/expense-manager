const httpStatus = require("http-status");
const Expense = require("../model/expense");
const ExpenseType = require("../enums/ExpenseType");

/**
 * Endpoint to get all expense
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllExpense(req, res) {
  const userId = req.body.userId;
  const allExpenses = await Expense.find({ userId: userId }).populate(["category", "account"]);
  return res.status(httpStatus.OK).send({
    message: "",
    data: allExpenses.map((e) => ({
      ...e.toObject(),
      id: e.id,
    })),
  });
}

/**
 * Endpoint to create a expense
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createExpense(req, res) {
  const { amount, description, date, type, categoryId, accountId, userId } = req.body;

  const isExpense = type === ExpenseType.EXPENSE

  if (!amount || !description || !date || (isExpense ? !categoryId: false) || !accountId || !userId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const newExpense = new Expense({
    amount,
    description,
    date,
    type,
    category: isExpense ? categoryId: null,
    account: accountId,
    userId,
  });
  await newExpense.save();

  return res.status(httpStatus.OK).send({
    message: "Expense created sucessfully",
    data: { id: newExpense.id },
  });
}

/**
 * Endpoint to update a expense
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateExpense(req, res) {
  const { id } = req.params;
  const { amount, description, date, categoryId, accountId, userId } = req.body;

  if (!amount || !description || !date || !categoryId || !accountId || !userId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const expense = await Expense.findById(id);

  expense.amount = amount;
  expense.description = description;
  expense.date = date;
  expense.category = categoryId;
  expense.account = accountId;

  await expense.save();

  if (!expense)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Expense not found", data: null });

  return res.status(httpStatus.OK).send({
    message: "Expense updated sucessfully",
    data: { id: expense.id },
  });
}

/**
 * Endpoint to delete a expense
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteExpense(req, res) {
  const { id } = req.params;

  const expense = await Expense.findById(id);

  if (!expense)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Expense not found", data: null });

  await expense.deleteOne();

  return res.status(httpStatus.OK).send({
    message: "Expense deleted sucessfully",
    data: null,
  });
}

module.exports = {
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
