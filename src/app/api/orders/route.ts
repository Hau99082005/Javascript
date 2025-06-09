import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import OrderItem from "@/models/orderItem";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { orderItems, shippingAddress, user, totalPrice } = await req.json();

    const createdOrderItems = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orderItems.map(async (item: any) => {
        const newItem = new OrderItem({
          product: item.product,
          quantity: item.quantity,
        });
        return await newItem.save();
      })
    );

    const order = new Order({
      orderItems: createdOrderItems.map(item => item._id),
      shippingAddress,
      user,
      totalPrice,
    });

    const savedOrder = await order.save();
    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
