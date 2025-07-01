import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import books from "@/models/books";


export async function GET(
  request: Request,
  { params }: { params: any }
) {
  try {
    await connectDB();
    const realParams = typeof params.then === 'function' ? await params : params;
    const book = await books.findById(realParams.id);
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
  { params }: { params: any }
) {
  try {
    await connectDB();
    const realParams = typeof params.then === 'function' ? await params : params;
    const body = await request.json();
    const book = await books.findByIdAndUpdate(realParams.id, body, {
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
  { params }: { params: any }
) {
  try {
    await connectDB();
    const realParams = typeof params.then === 'function' ? await params : params;
    const book = await books.findByIdAndDelete(realParams.id);
    if (!book) {
      return NextResponse.json({ error: "books not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "books deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}