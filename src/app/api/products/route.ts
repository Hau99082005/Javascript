import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/products";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      productName,
      productImage,
      productPrice,
      productPriceOld,
      date,
      productcode,
      quantity,
      actor,
      pages,
      description,
      category,
      subcategory,
      popular,
      recommend,
    } = body;
    if (
      !productName || !productImage || productPrice === undefined || productPriceOld === undefined ||
      !date || !productcode || quantity === undefined || pages === undefined ||
      !description || !category || !subcategory || !actor
    ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const product = await Product.create({
      productName,
      productImage,
      productPrice,
      productPriceOld,
      date,
      productcode,
      quantity,
      actor,
      pages,
      description,
      category,
      subcategory,
      popular,
      recommend,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}
