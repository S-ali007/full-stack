const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: [true, "password is required"] },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
