const mongoose = require("mongoose");
const Category = require("./category");

const Schema = mongoose.Schema;
const budgetSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  limit: {
    type: Number,
    required: [true, "Limit is required"] 
  },

  month: {
    type: Number,
    required: [true, "Month is required"]
  },

  year: {
    type: Number,
    required: [true, "Year is required"]
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
