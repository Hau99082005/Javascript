// api/categories.js
import { NextResponse } from 'next/server'
import Category from '@/models/categories'
import connectDB from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const { id, name, image, desc } = body

    console.log('Received data:', body) // Debug

    if (!name || !image || !desc) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      )
    }

    const category = await Category.create({ id, name, image, desc })
    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { message: 'Error creating category', error: error.message },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({})
    return NextResponse.json(categories)
  } catch (error: unknown) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 },
    )
  }
}
