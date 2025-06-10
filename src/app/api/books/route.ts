import { NextResponse } from "next/server";
import books from "@/models/books";
import connectDB from "@/lib/mongodb";
import { Document } from "mongoose";

interface BookDocument extends Document {
  image: string;
  name: string;
}

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
    const allBooks = await books.find({}).lean();
    
    // Convert Mongoose documents to plain objects
    const plainBooks = allBooks.map((book: any) => ({
      _id: book._id.toString(),
      image: book.image,
      name: book.name
    }));

    return NextResponse.json(plainBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { message: "Error fetching books", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
