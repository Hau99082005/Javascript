import connectDB from '@/lib/mongodb'
import User from '@/models/user'
import Cart from '@/models/cart'
import Product from '@/models/products'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') ?? '684b95055a83d54e3e2166a1'
    console.log({ id })
    if (!id)
      return NextResponse.json({
        success: false,
        message: 'Vui lòng cung cấp ID người dùng!',
      })
    const extractAllCartItems = await Cart.find({ userID: id })
      .populate('userID')
      .populate(
        'productID',
        'productName productImage productPrice productPriceOld',
      ) // Specify fields to populate
    if (extractAllCartItems && extractAllCartItems.length > 0) {
      return NextResponse.json({
        success: true,
        data: extractAllCartItems,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Giỏ hàng của bạn rỗng!',
        status: 204,
      })
    }
  } catch (e) {
    console.error(e) // Log error for debugging
    return NextResponse.json({
      success: false,
      message: 'Đã xảy ra lỗi! vui lòng thử lại',
    })
  }
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
) {
  await connectDB()
  await Cart.findByIdAndUpdate(
    new mongoose.Types.ObjectId(cartItemId),
    { $set: { quantity } },
  )
}
