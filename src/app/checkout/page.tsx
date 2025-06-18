'use client';
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { GlobalContext } from '@/context/page'
import { fetchAllAddresses } from '@/services/address/address'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { CirclePlus } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { callStripeSession } from '@/services/stripe/stripe'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactLoading from 'react-loading';
import { createNewOrder } from '@/services/order/order'

export default function CheckOut() {
  const {
    cartItems,
    Addresses,
    user,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
    setCartItems,
    setUser,
  } = useContext(GlobalContext)
  const items = cartItems?.data ?? []
  const router = useRouter()
  const params = useSearchParams()

  const publishableKey =
    'pk_test_51R7i72GXfpQH0gjneTCgmHqokzJC6GwE5KehiDX1PpaZMmUctvkDOmxn2oY9pPpeHRkNYjhUXGb2FhPVxyTvHLDz00guqNYASj'
  const stripePromise = loadStripe(publishableKey)
  console.log(stripePromise)

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isOrderProccessing, setIsOrderProccessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  console.log(cartItems)

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id)
    if (res.success) {
      setAddresses(res.data)
    }
  }

  const handleUpdateAddress = (address: any) => {
    // Xử lý khi người dùng chọn địa chỉ
    console.log('Selected address:', address)
    // Thêm logic xử lý địa chỉ được chọn ở đây
  }

  useEffect(() => {
    if (user !== null) getAllAddresses()
  }, [user])

  useEffect(() => {
    async function fetchCart() {
      if (user?._id) {
        // Nếu đã đăng nhập, lấy cart từ API
        try {
          const res = await fetch(
            `/api/cart/all-cart-items?_id=${user._id}`,
          )
          const data = await res.json()
          if (data.success) {
            setCartItems({ data: data.data, success: true })
          }
        } catch (err) {
          console.error('Lỗi khi fetch cart:', err)
        }
      } else {
        // Nếu chưa đăng nhập, lấy cart từ localStorage
        const getCartItems = localStorage.getItem('cartItems')
        if (getCartItems) {
          try {
            const parsed = JSON.parse(getCartItems)
            if (parsed?.data && Array.isArray(parsed.data)) {
              setCartItems(parsed)
            } else if (Array.isArray(parsed)) {
              setCartItems({ data: parsed, success: true })
            }
          } catch (err) {
            console.error('Lỗi khi parse cartItems:', err)
          }
        }
      }
    }
    fetchCart()
  }, [user])

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null)
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      })
      return
    }
    setSelectedAddress(getAddress._id)
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        name: getAddress.name,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    })
  }

  async function handleCheckout() {
    try {
      const stripe = await stripePromise
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const lineItems = items.map((item) => {
        let imageUrl = item.productID.productImage
        let imageUrlFinal: string | undefined = undefined
        if (imageUrl && typeof imageUrl === 'string') {
          if (/^https?:\/\//i.test(imageUrl)) {
            if (/^https:\/\//i.test(imageUrl)) {
              imageUrlFinal = imageUrl
            }
          } else {
            const fullUrl = `${baseUrl}${
              imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl
            }`
            if (/^https:\/\//i.test(fullUrl)) {
              imageUrlFinal = fullUrl
            }
          }
        }
        const productData: { name: string; images?: string[] } = {
          name: item.productID.productName,
        }
        if (imageUrlFinal) {
          productData.images = [imageUrlFinal]
        }
        return {
          price_data: {
            currency: 'VND',
            product_data: productData,
            unit_amount: item.productID.productPrice,
          },
          quantity: item.quantity,
        }
      })

      const response = await callStripeSession({
        line_items: lineItems,
        email: user?.email,
        userId: user?._id,
        shippingAddress: checkoutFormData.shippingAddress,
        shippingRate: checkoutFormData.shippingRate,
      })
      console.log('Stripe session response:', response)
      if (!response || !response.success || !response.id) {
        throw new Error(
          response?.message || 'Không thể tạo phiên thanh toán',
        )
      }

      setIsOrderProccessing(true)
      localStorage.setItem('stripe', 'true')
      localStorage.setItem(
        'checkoutFormData',
        JSON.stringify(checkoutFormData),
      )

      const result = await stripe?.redirectToCheckout({
        sessionId: response.id,
      })

      if (result?.error) {
        console.error('Stripe checkout error:', result.error)
        setIsOrderProccessing(false)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      setIsOrderProccessing(false)
    }
  }

  useEffect(() => {
    const createFinalOrder = async () => {
      try {
        const stripeData = localStorage.getItem('stripe')
        const checkoutData = localStorage.getItem('checkoutFormData')

        if (!stripeData || !checkoutData) return

        const isStripe = JSON.parse(stripeData)
        const getCheckoutFormData = JSON.parse(checkoutData)

        if (
          isStripe &&
          params?.get('status') === 'success' &&
          cartItems &&
          cartItems.data &&
          cartItems.data.length > 0
        ) {
          if (!user || !user._id) {
            toast.error('Bạn cần đăng nhập để đặt hàng!')
            setIsOrderProccessing(false)
            return
          }
          setIsOrderProccessing(true)

          const createFinalCheckoutFormData = {
            user: user._id,
            shippingAddress: getCheckoutFormData.shippingAddress,
            orderItems: cartItems.data.map((item) => ({
              qty: item.quantity,
              product: item.productID,
            })),
            paymentMethod: 'Stripe',
            totalPrice: items.reduce(
              (total, item) =>
                total +
                (item.productID?.productPrice || 0) * item.quantity,
              0,
            ),
            isPaid: true,
            isProcessing: true,
            paidAt: new Date(),
          }

          const res = await createNewOrder(
            createFinalCheckoutFormData,
          )

          if (res.success) {
            setOrderSuccess(true)
            toast.success(res.message, {
              position: 'top-right',
            })
          } else {
            setOrderSuccess(false)
            toast.error(res.message || 'Order failed', {
              position: 'top-right',
            })
          }

          setIsOrderProccessing(false)
        }
      } catch (err) {
        console.error('Order creation failed:', err)
        toast.error(
          'Something went wrong while processing the order.',
          {
            position: 'top-right',
          },
        )
        setIsOrderProccessing(false)
      }
    }

    createFinalOrder()
  }, [params?.get('status'), cartItems])

  // Lấy lại user từ localStorage nếu bị null (sau redirect Stripe)
  useEffect(() => {
    if (!user) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          if (userObj && userObj._id) {
            setUser(userObj);
          }
        } catch (e) {}
      }
    }
  }, [user, setUser]);

  console.log(checkoutFormData)

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-semibold text-xl"
                 style={{fontFamily: "Lato", fontSize: "30px", fontWeight: "bolder"}}>
                  Bạn đã thanh toán thành công!
                </h1>
                <Button
                  onClick={() => {
                    router.push('/account/orders')
                    localStorage.removeItem('stripe')
                    localStorage.removeItem('checkoutFormData')
                  }}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] text-lg font-semibold py-6"
                  style={{
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Lato',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                  }}
                >
                  Xem đơn hàng của bạn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isOrderProccessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <ReactLoading
          type="spin"
          color="#000000"
          height={30}
          width={30}
        />
        <ToastContainer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
          style={{
            fontSize: '30px',
            fontFamily: 'Lato',
            fontWeight: 'bold',
          }}
        >
          Thanh Toán
        </h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2
              className="text-2xl font-semibold text-gray-900 mb-6 flex items-center"
              style={{
                fontFamily: 'Lato',
                fontSize: '25px',
                fontWeight: 'bolder',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Tóm tắt giỏ hàng
            </h2>
            <div className="space-y-4">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-100"
                    key={item._id}
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={
                          item.productID?.productImage ||
                          '/default-image.jpg'
                        }
                        alt={
                          item.productID?.productName ||
                          'Ảnh sản phẩm'
                        }
                        fill
                        className="rounded-lg object-cover shadow-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-medium text-gray-900"
                        style={{
                          fontFamily: 'Lato',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.productID?.productName}
                      </h3>
                      <div className="flex gap-2">
                        <p className="text-red-600 font-semibold mt-1">
                          {item.productID?.productPrice?.toLocaleString(
                            'vi-VN',
                          )}{' '}
                          ₫
                        </p>
                        <p className="text-gray-600 text-decoration-line-through font-semibold mt-1">
                          {/* Nếu có productPriceOld thì hiển thị, còn không thì bỏ qua */}
                          {/* {item.productID?.productPriceOld?.toLocaleString('vi-VN')} ₫ */}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">
                    Giỏ hàng của bạn rỗng!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
              <h2
                className="text-2xl font-semibold text-gray-900 mb-4 flex items-center"
                style={{
                  fontFamily: 'Lato',
                  fontSize: '25px',
                  fontWeight: 'bolder',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Địa chỉ giao hàng
              </h2>
              <p
                className="text-gray-600 mb-6"
                style={{
                  fontFamily: 'Lato',
                  fontSize: '18px',
                  fontWeight: 'lighter',
                }}
              >
                Vui lòng chọn địa chỉ giao hàng của bạn
              </p>

              <div className="space-y-4">
                {Addresses && Addresses.length > 0 ? (
                  Addresses.map((item) => (
                    <div
                      onClick={() => handleSelectedAddress(item)}
                      key={item._id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                        item._id === selectedAddress
                          ? 'border-red-500 bg-red-50 shadow-md'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <h3
                          className="font-medium text-gray-900 text-lg"
                          style={{
                            fontFamily: 'Lato',
                            fontSize: '23px',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-gray-600"
                          style={{
                            fontFamily: 'Lato',
                            fontWeight: 'lighter',
                            fontSize: '18px',
                          }}
                        >
                          {item.address}
                        </p>
                        <p
                          className="text-gray-600"
                          style={{
                            fontFamily: 'Lato',
                            fontWeight: 'lighter',
                            fontSize: '18px',
                          }}
                        >
                          {item.city}, {item.country}{' '}
                          {item.postalCode}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleUpdateAddress(item)}
                        className={`w-full mt-4 transform transition-all duration-300 ${
                          item._id === selectedAddress
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        style={{
                          border: 'none',
                          borderRadius: '10px',
                          fontFamily: 'Lato',
                          fontSize: '20px',
                          fontWeight: 'bolder',
                        }}
                      >
                        {item._id === selectedAddress
                          ? '✓ Địa chỉ đã chọn'
                          : 'Chọn địa chỉ'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-gray-500 text-lg">
                      Không có địa chỉ nào được lưu
                    </p>
                  </div>
                )}
              </div>

              <Button
                style={{
                  fontFamily: 'Lato',
                  fontSize: '20px',
                  fontWeight: 'bolder',
                  border: 'none',
                  borderRadius: '10px',
                }}
                onClick={() => router.push('/account')}
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800 transform transition-all duration-300 hover:scale-[1.02]"
              >
                <CirclePlus /> Thêm địa chỉ nhận hàng mới
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
              <h2
                className="text-2xl font-semibold text-gray-900 mb-6 flex items-center"
                style={{
                  fontFamily: 'Lato',
                  fontWeight: 'bold',
                  fontSize: '25px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Tổng đơn hàng
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 py-2">
                  <span
                    className="font-medium"
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Lato',
                      fontWeight: 'lighter',
                    }}
                  >
                    Tổng phụ
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Lato',
                      fontWeight: 'lighter',
                    }}
                  >
                    {items.length > 0
                      ? items
                          .reduce(
                            (total, item) =>
                              total +
                              (item.productID?.productPrice || 0) *
                                item.quantity,
                            0,
                          )
                          .toLocaleString('vi-VN') + ' ₫'
                      : '0 ₫'}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 py-2">
                  <span
                    className="font-medium"
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Lato',
                      fontWeight: 'lighter',
                    }}
                  >
                    Phí vận chuyển
                  </span>
                  <span
                    className="text-green-600 font-semibold"
                    style={{
                      fontSize: '20px',
                      fontFamily: 'Lato',
                      fontWeight: 'lighter',
                    }}
                  >
                    Miễn phí
                  </span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span
                      style={{
                        fontSize: '25px',
                        fontFamily: 'Lato',
                        fontWeight: 'bolder',
                      }}
                    >
                      Tổng cộng
                    </span>
                    <span
                      className="text-red-600"
                      style={{
                        fontSize: '25px',
                        fontFamily: 'Lato',
                        fontWeight: 'bolder',
                      }}
                    >
                      {items.length > 0
                        ? items
                            .reduce(
                              (total, item) =>
                                total +
                                (item.productID?.productPrice || 0) *
                                  item.quantity,
                              0,
                            )
                            .toLocaleString('vi-VN') + ' ₫'
                        : '0 ₫'}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={
                    (items && items.length === 0) ||
                    Object.keys(checkoutFormData.shippingAddress)
                      .length === 0
                  }
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] text-lg font-semibold py-6"
                  style={{
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Lato',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                  }}
                >
                  Thanh Toán Ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
