const httpStatus = require("http-status");
const Budget = require("../model/budget");
const Category = require("../model/category");

/**
 * Endpoint to get all categories
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllBudget(req, res) {
  const { userId, month, year } = req.body;
  const categories = await Category.find({ userId: userId });
  const allBudgets = await Promise.all(
    categories.map(async (category) => {
      const budget = await Budget.findOne({
        category: category._id,
        month: month,
        year: year,
      });
      budgetCategory = category.toObject();
      budgetCategory.budget = budget ? { ...budget.toObject(), id: budget.id } : null;
      return { ...budgetCategory, id: category.id };
    })
  );

  return res.status(httpStatus.OK).send({
    message: "",
    data: allBudgets,
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

  const category = await Category.findById(id);

  if (!category)
    return res.status(httpStatus.NOT_FOUND).send({
      message: "Category not found",
      data: null,
    });

  const newBudget = new Budget({ category: category._id, limit, month, year });

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
  const { limit } = req.body;

  if (!limit)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const budget = await Budget.findById(id);

  budget.limit = limit;

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
