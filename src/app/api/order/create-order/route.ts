import connectDB from '@/lib/mongodb'
import AuthUser from '@/middleware/Auth'
import Cart from '@/models/cart'
import Order from '@/models/order'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectDB()
    const isAuthUser = await AuthUser(req)

    if (isAuthUser) {
      const data = await req.json()
      const { user } = data

      if (typeof data.isProccessing === 'undefined') {
           data.isProccessing = true
        }

      const saveNewOrder = await Order.create(data)

      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user })

        return NextResponse.json({
          success: true,
          message: 'Sản phẩm đang trên đường đến!',
        })
      } else {
        return NextResponse.json({
          success: false,
          message: 'Không tạo được đơn hàng! Vui lòng thử lại',
        })
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'Bạn chưa được xác thực!',
      })
    }
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      success: false,
      message: 'Đã xảy ra lỗi! vui lòng thử lại sau',
    })
  }
}
