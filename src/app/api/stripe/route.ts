import AuthUser from '@/middleware/Auth'
import { NextResponse } from 'next/server'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req)
    if (isAuthUser) {
      const { line_items, email, userId, shippingAddress, shippingRate } = await req.json()
      console.log('Stripe line_items:', { line_items, email, userId, shippingAddress, shippingRate })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        metadata: {
          userId,
          shippingAddress: JSON.stringify(shippingAddress),
          shippingRate: shippingRate.toString()
        },
        success_url: `http://localhost:3000/checkout?status=success`,
        cancel_url: `http://localhost:3000/checkout?status=cancel`,
      })

      return NextResponse.json({
        success: true,
        id: session.id,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Bạn chưa được xác thực!',
      })
    }
  } catch (e: any) {
    console.error('Stripe error:', e);
    if (e && e.raw) {
      console.error('Stripe error details:', JSON.stringify(e.raw, null, 2));
    }
    return NextResponse.json({
      success: false,
      message: 'Đã có lỗi xảy ra! vui lòng thử lại sau',
      error: e.message,
      stripeError: e.raw || null
    })
  }
}
