const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const accountSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name cannot exceed 30 characters"],
  },

  userId: {
    type: String,
    required: [true, "UserId is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Account", accountSchema);
