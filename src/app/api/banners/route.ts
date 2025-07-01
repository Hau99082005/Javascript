import { NextResponse } from "next/server";
import Banner from "@/models/banner";
import connectDB from "@/lib/mongodb";
import { promises as fs } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  await connectDB();
  try {
    // Parse form data
    const formData = await req.formData();
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
    // Save to DB
    const banner = await Banner.create({ image: imagePath, desc });
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
