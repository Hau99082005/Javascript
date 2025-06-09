import { NextResponse } from "next/server";
import OutStanding from "@/models/outstanding";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, image } = body;

    if ( !name || !image ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const outstanding = await OutStanding.create({ name, image });

    return NextResponse.json({ message: "OutStanding created successfully", outstanding }, { status: 201 });
  } catch (error) {
    console.error("Error creating Outstanding:", error);
    return NextResponse.json({ message: "Error creating Outstanding" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const outstandings = await OutStanding.find({});
    return NextResponse.json(outstandings);
  } catch (error) {
    console.error("Error fetching outstanding:", error);
    return NextResponse.json({ message: "Error fetching outstanding" }, { status: 500 });
  }
}
