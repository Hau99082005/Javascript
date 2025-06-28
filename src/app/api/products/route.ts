import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/products'
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    let query = {};
    if (categoryId) {
      query = { id_category: new mongoose.Types.ObjectId(categoryId) };
    }
    const products = await Product.find(query);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/products error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 },
    )
  }
}
