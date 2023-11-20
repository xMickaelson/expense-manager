const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const accountSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name cannot exceed 30 characters"],
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

module.exports = mongoose.model("Account", accountSchema);
