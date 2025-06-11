import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import books from "@/models/books";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const book = await books.findById(params.id);
    if (!book) {
      return NextResponse.json({ error: "Books not found" }, { status: 404 });
    }
    return NextResponse.json(book);
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
    const book = await books.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return NextResponse.json({ error: "books not found" }, { status: 404 });
    }
    return NextResponse.json(book);
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
    const book = await books.findByIdAndDelete(params.id);
    if (!book) {
      return NextResponse.json({ error: "books not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "books deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}