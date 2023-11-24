const mongoose = require("mongoose");
const ExpenseType = require("../enums/ExpenseType");

const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  description: {
    type: String,
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },

  date: {
    type: Date,
    required: [true, "Date is required"],
  },

  type: {
    type: String,
    enum: [ExpenseType.EXPENSE, ExpenseType.INCOME],
    default: "Expense",
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "AccountId is required"],
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
