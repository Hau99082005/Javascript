import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  id: String;
  productName: string;
  productImage: string;
  productPrice: number;
  productPriceOld: number;
  date: Date;
  productcode: string;
  quantity: number;
  actor: string;
  pages: number;
  description: string;
  category: string;
  subcategory: string;
  popular: boolean;
  recommend: boolean;
}

const productSchema = new Schema<IProduct>({
  id: {type: String, required: true},
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productPriceOld: { type: Number },
  date: { type: Date, required: true },
  productcode: { type: String, required: true },
  quantity: { type: Number, required: true },
  actor: {type: String, required: true},
  pages: { type: Number },
  description: { type: String },
  category: { type: String },
  subcategory: { type: String },
  popular: { type: Boolean, default: false },
  recommend: { type: Boolean, default: false },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;