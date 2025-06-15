'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'
import { getAllCartItems } from '@/services/cart/cart'
import { X, Plus, Minus, CheckSquare, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

interface CartItem {
  _id: string
  productID: {
    _id: string
    productName: string
    productImage: string
    productPrice: number
    productPriceOld?: number
    quantity: number
  }
  quantity: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { updateCartCount } = useCart()
  const [selectAll, setSelectAll] = useState(true)
  const [selected, setSelected] = useState<Record<string, boolean>>(
    {},
  )
  const total = cartItems.reduce((sum, item) => {
    if (!selected[item._id]) return sum
    return sum + item.productID.productPrice * item.quantity
  }, 0)
  useEffect(() => {
    const fetchCartItems = async () => {
      const userID = localStorage.getItem('userID')
      if (!userID) {
        toast.error('Vui lòng đăng nhập để xem giỏ hàng!')
        router.push('/login')
        return
      }
      const data = await getAllCartItems(userID)
      if (data.success) {
        setCartItems(data.data)
        localStorage.setItem("cartItems", JSON.stringify(data));
        updateCartCount(data.data.length)
        const initSel: Record<string, boolean> = {}
        data.data.forEach((i: CartItem) => (initSel[i._id] = true))
        setSelected(initSel)
      } else {
        toast.error(
          data.message || 'Không thể lấy danh sách giỏ hàng!',
        )
      }
      setLoading(false)
    }
    fetchCartItems()
  }, [router, updateCartCount])
  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      const response = await fetch(
        `/api/cart/delete-from-cart?id=${cartItemId}`,
        {
          method: 'DELETE',
        },
      )
      const data = await response.json()
      if (data.success) {
        setCartItems(
          cartItems.filter((item) => item._id !== cartItemId),
        )
        updateCartCount(cartItems.length - 1)
        toast.success('Sản phẩm đã được xóa khỏi giỏ hàng!')
        const newSel = { ...selected }
        delete newSel[cartItemId]
        setSelected(newSel)
      } else {
        toast.error(data.message || 'Xóa sản phẩm thất bại!')
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại!')
    }
  }

  const handleUpdateQuantity = async (
    cartItemId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return
    const prev = [...cartItems]
    setCartItems(
      prev.map((it) =>
        it._id === cartItemId ? { ...it, quantity: newQuantity } : it,
      ),
    )
    try {
      const res = await fetch(`/api/cart/update-quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      })
      const data = await res.json()
      if (!data.success) {
        setCartItems(prev)
        toast.error('Cập nhật số lượng thất bại!')
      } else {
        toast.success('Đã cập nhật số lượng sản phẩm!')
      }
    } catch (e) {
      setCartItems(prev)
      toast.error('Có lỗi xảy ra khi cập nhật số lượng!')
    }
  }

  const toggleSelectAll = () => {
    const newVal = !selectAll
    setSelectAll(newVal)
    const newSel: Record<string, boolean> = {}
    cartItems.forEach((i) => (newSel[i._id] = newVal))
    setSelected(newSel)
  }

  const toggleSelect = (id: string) => {
    const newSel = { ...selected, [id]: !selected[id] }
    setSelected(newSel)
    setSelectAll(Object.values(newSel).every(Boolean))
  }

  const handleCheckout = () => router.push('/checkout')
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
          }}
          style={{
            height: '3rem',
            width: '3rem',
            borderRadius: '9999px',
            border: '6px solid #dc2626',
            borderTopColor: 'transparent',
          }}
        />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1
          className="text-4xl font-bold text-gray-800 mb-6"
          style={{
            fontFamily: 'Lato',
            fontSize: '30px',
            fontWeight: 'bolder',
          }}
        >
          🛒 Giỏ hàng của bạn đang trống!
        </h1>
        <p
          className="text-gray-500 mb-6 text-lg"
          style={{
            fontFamily: 'Lato',
            fontSize: '20px',
            fontWeight: 'lighter',
          }}
        >
          Hãy khám phá thêm nhiều sản phẩm thú vị đang chờ bạn.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition-all duration-300 shadow-md"
          style={{
            fontFamily: 'Lato',
            textDecoration: 'none',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10">
      <div className="container mx-auto px-4 lg:flex lg:space-x-6">
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
            <div className="hidden lg:grid grid-cols-12 gap-4 font-semibold px-6 py-4 bg-gradient-to-r from-red-100 to-red-50 text-gray-700 text-sm">
              <div className="col-span-5 flex items-center space-x-2">
                <button
                  onClick={toggleSelectAll}
                  aria-label="Chọn tất cả"
                  className="hover:bg-red-100 p-1 rounded-full transition-colors"
                >
                  {selectAll ? (
                    <CheckSquare size={20} className="text-red-600" />
                  ) : (
                    <Square size={20} className="text-gray-400" />
                  )}
                </button>
                <span className="text-base">Chọn tất cả ({cartItems.length} sản phẩm)</span>
              </div>
              <div className="col-span-3 text-center text-base">Số lượng</div>
              <div className="col-span-2 text-right text-base">Thành tiền</div>
              <div className="col-span-2" />
            </div>
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <div key={item._id} className="hover:bg-red-50/50 transition-colors">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                      gap: '1rem',
                      padding: '1.5rem',
                      borderTop: '1px solid #e5e7eb',
                    }}
                  >
                    <div className="col-span-12 lg:col-span-5 flex items-start space-x-4">
                      <button
                        onClick={() => toggleSelect(item._id)}
                        aria-label="Chọn"
                        className="hover:bg-red-100 p-1 rounded-full transition-colors mt-1"
                      >
                        {selected[item._id] ? (
                          <CheckSquare size={20} className="text-red-600" />
                        ) : (
                          <Square size={20} className="text-gray-400" />
                        )}
                      </button>
                      <div className="relative w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
                        <Image
                          src={item.productID.productImage}
                          alt={item.productID.productName}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <h3
                          className="text-base font-medium line-clamp-2 mb-2 hover:text-red-600 transition-colors"
                          style={{
                            fontFamily: 'Lato',
                            fontWeight: 'bolder',
                            fontSize: '18px',
                          }}
                        >
                          {item.productID.productName}
                        </h3>
                        <div className="space-y-1">
                          {item.productID.productPriceOld && (
                            <div className="text-sm text-gray-500 line-through">
                              {item.productID.productPriceOld.toLocaleString('vi-VN')}đ
                            </div>
                          )}
                          <div className="text-lg font-semibold text-red-600">
                            {item.productID.productPrice.toLocaleString('vi-VN')}đ
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 lg:col-span-3 flex items-center justify-center lg:justify-between space-x-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 rounded-full border-2 hover:bg-red-50 hover:border-red-200 disabled:opacity-50"
                      >
                        <Minus size={16} className="text-gray-600" />
                      </Button>
                      <span className="w-12 text-center text-base font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="h-8 w-8 rounded-full border-2 hover:bg-red-50 hover:border-red-200"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </Button>
                    </div>
                    <div className="col-span-4 lg:col-span-2 flex items-center justify-end">
                      <div className="text-lg font-semibold text-red-600">
                        {(item.productID.productPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                    <div className="col-span-2 hidden lg:flex items-center justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="h-8 w-8 rounded-full hover:bg-red-50"
                      >
                        <X size={18} className="text-gray-500 group-hover:text-red-600 transition-colors" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            width: '24rem',
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <Card className="shadow-lg border border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b bg-gradient-to-r from-red-100 to-red-50">
              <h2
                className="text-xl font-semibold text-gray-800"
                style={{
                  fontFamily: 'Lato',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                Tóm tắt đơn hàng
              </h2>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="flex-1 pr-4">
                      <p className="font-medium text-gray-700" style={{ fontFamily: 'Lato', fontSize: "16px", fontWeight: "bold" }}>
                        {item.productID.productName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.productID.productPrice.toLocaleString('vi-VN')}đ x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-semibold text-red-600">
                      {(item.productID.productPrice * item.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-base" style={{ fontFamily: 'Lato' }}>
                  <span className="text-gray-600">Thành tiền</span>
                  <span className="font-semibold">{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-red-600" style={{ fontFamily: 'Lato' }}>
                  <span>Tổng Số Tiền (gồm VAT)</span>
                  <span>{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    disabled={total === 0}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 h-12 text-base font-semibold rounded-xl shadow-lg shadow-red-200"
                    style={{ fontFamily: 'Lato', fontWeight: 'bold', border: "none", borderRadius: "10px", fontSize: "20px" }}
                  >
                    THANH TOÁN
                  </Button>
                </motion.div>
                <p
                  className="text-sm text-gray-500 text-center"
                  style={{
                    fontFamily: 'Lato',
                    fontWeight: 'lighter',
                    fontSize: '17px'
                  }}
                >
                  (Giảm giá trên web chỉ áp dụng cho bán lẻ)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
