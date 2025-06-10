import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/categories";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const categories = await Category.findById(params.id);
    if (!categories) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const categories = await Category.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!categories) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const categories = await Category.findByIdAndDelete(params.id);
    if (!categories) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Categories deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 