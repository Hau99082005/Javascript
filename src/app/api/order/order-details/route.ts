import connectDB from '@/lib/mongodb'
import AuthUser from '@/middleware/Auth'
import Order from '@/models/order'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    await connectDB()
    const isAuthUser = await AuthUser(req)

    if (isAuthUser) {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')

      if (!id)
        return NextResponse.json({
          success: false,
          message: 'Product ID không hợp lệ',
        })
      const extractOrderDetails = await Order.findById(id).populate(
        'orderItems.product',
      )

      if (extractOrderDetails) {
        return NextResponse.json({
          success: true,
          data: extractOrderDetails,
        })
      } else {
        return NextResponse.json({
          success: false,
          message:
            'Không lấy được thông tin chi tiết đơn hàng! vui lòng thử lại',
        })
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'Bạn chưa được xác thực',
      })
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Có lỗi xảy ra! vui lòng thử lại sau',
    })
  }
}
