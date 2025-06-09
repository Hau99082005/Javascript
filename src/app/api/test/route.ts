import connectToDB from '@/database/data';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDB();
  return NextResponse.json({ message: 'Connected to MongoDB' });
}
