import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Banner from "@/models/banner";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: any }
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
  { params }: { params: any }
) {
  try {
    await connectDB();
    let updated;
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File | null;
      const desc = formData.get("desc") as string | null;
      if (!file || !desc) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
      // Save file to public/uploads
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const filename = Date.now() + "-" + (file.name || "banner.jpg");
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      const imagePath = "/uploads/" + filename;
      updated = await Banner.findByIdAndUpdate(
        params.id,
        { image: imagePath, desc },
        { new: true, runValidators: true }
      );
    } else {
      const body = await request.json();
      updated = await Banner.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
      });
    }
    if (!updated) {
      return NextResponse.json({ error: "banners not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
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
    const banners = await Banner.findByIdAndDelete(params.id);
    if (!banners) {
      return NextResponse.json({ error: "banners not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "banners deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}