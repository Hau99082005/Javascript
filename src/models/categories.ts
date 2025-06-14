// @/models/categories.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String, required: true },
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;