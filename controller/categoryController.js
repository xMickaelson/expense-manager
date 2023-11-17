const httpStatus = require("http-status");
const Category = require("../model/category");

/**
 * Endpoint to get all categories
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllCategory(req, res) {
  const userId = req.body.userId;
  const allCategories = await Category.find({ userId: userId });
  return res.status(httpStatus.OK).send({
    message: "",
    data: allCategories.map((c) => ({
      name: c.name,
      emoji: c.emoji,
      id: c.id,
    })),
  });
}

/**
 * Endpoint to create a category
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createCategory(req, res) {
  const { name, emoji, userId } = req.body;

  if (!name || !emoji || !userId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const newCategory = new Category({ name, emoji, userId });
  await newCategory.save();

  return res.status(httpStatus.OK).send({
    message: "Category created sucessfully",
    data: { id: newCategory.id },
  });
}

/**
 * Endpoint to update a category
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function updateCategory(req, res) {
  const { cId } = req.params;
  const { name, emoji } = req.body;

  if (!name || !emoji)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Missing fields", data: null });

  const category = Category.findByIdAndUpdate(cId, { name, emoji });

  if (!category)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Category not found", data: null });

  return res.status(httpStatus.OK).send({
    message: "Category updated sucessfully",
    data: { id: category.id },
  });
}
/**
 * Endpoint to delete a category
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function deleteCategory(req, res) {
  const { cId } = req.params;

  const category = Category.findByIdAndDelete(cId);

  if (!category)
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Category not found", data: null });

  return res.status(httpStatus.OK).send({
    message: "Category deleted sucessfully",
    data: null,
  });
}

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
