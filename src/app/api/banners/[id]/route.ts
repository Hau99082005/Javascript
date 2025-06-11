import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/banner";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const banners = await Banner.findById(params.id);
    if (!banners) {
      return NextResponse.json({ error: "Banners not found" }, { status: 404 });
    }
    return NextResponse.json(banners);
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
    const banners = await Banner.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!banners) {
      return NextResponse.json({ error: "banners not found" }, { status: 404 });
    }
    return NextResponse.json(banners);
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
    const banners = await Banner.findByIdAndDelete(params.id);
    if (!banners) {
      return NextResponse.json({ error: "banners not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "banners deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}