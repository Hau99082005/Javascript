import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/products";

export async function GET(
  request: Request,
  { params }: { params: { productcode: string } }
) {
  try {
    await connectDB();
    const product = await Product.findOne({ productcode: params.productcode });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { productcode: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.findOneAndUpdate(
      { productcode: params.productcode },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productcode: string } }
) {
  try {
    await connectDB();
    const product = await Product.findOneAndDelete({ productcode: params.productcode });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 