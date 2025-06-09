import { NextResponse } from "next/server";
import books from "@/models/books";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { image, name } = body;

    if ( !image || !name ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const book = await books.create({  image,name });

    return NextResponse.json({ message: "books created successfully", book }, { status: 201 });
  } catch (error) {
    console.error("Error creating books:", error);
    return NextResponse.json({ message: "Error creating books" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const book = await books.find({});
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ message: "Error fetching books" }, { status: 500 });
  }
}
