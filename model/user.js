const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name cannot exceed 30 characters"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },

  password: {
    type: String,
    required: true,
  },

  budget: {
    type: Number,
    required: true,
    default: 20000,
  },

  googleId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
