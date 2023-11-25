const mongoose = require("mongoose");
const Expense = require("./expense");

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

accountSchema.post('deleteOne', {document: true}, async (next) => {
  console.log(`Clearing expenses for account ${this.toString()}`)
  next()
})

module.exports = mongoose.model("Account", accountSchema);
