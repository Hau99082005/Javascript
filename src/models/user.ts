import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

export const User = mongoose.model("User", UserSchema);
module.exports = User;