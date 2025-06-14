import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
  id: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    default: true,
  }
}, {timestamps: true})


const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;