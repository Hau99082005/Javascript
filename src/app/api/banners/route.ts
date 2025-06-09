import { NextResponse } from "next/server";
import Banner from "@/models/banner";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { image, desc } = body;

    if ( !image || !desc ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const banner = await Banner.create({  image,desc });

    return NextResponse.json({ message: "Banner created successfully", banner }, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ message: "Error creating banner" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const banners = await Banner.find({});
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ message: "Error fetching banners" }, { status: 500 });
  }
}
