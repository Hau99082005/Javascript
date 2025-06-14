import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart";              
import { Types } from "mongoose";

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  await connectDB();

  // Bảo đảm _id là ObjectId hợp lệ
  if (!Types.ObjectId.isValid(cartItemId))
    throw new Error("cartItemId không hợp lệ");

  await Cart.updateOne(
    { _id: cartItemId },
    { $set: { quantity } }
  );
}
