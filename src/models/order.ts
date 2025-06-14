import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem", required: true }],
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;