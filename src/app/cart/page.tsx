"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface CartItem {
  _id: string;
  productID: {
    productName: string;
    productImage: string;
    price: number;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userID = localStorage.getItem('userID');
        if (!userID) {
          alert('Vui lòng đăng nhập để xem giỏ hàng!');
          router.push('/login');
          return;
        }
        const response = await fetch(`/api/cart/all-cart-items?_id=${userID}`);
        const data = await response.json();
        if (data.success) {
          setCartItems(data.data);
        } else {
          alert(data.message || 'Không thể lấy danh sách giỏ hàng!');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [router]);

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart/delete-from-cart?_id=${cartItemId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(cartItems.filter(item => item._id !== cartItemId));
        updateCartCount(cartItems.length - 1);
        alert('Sản phẩm đã được xóa khỏi giỏ hàng!');
      } else {
        alert(data.message || 'Xóa sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (loading) return <div>Loading...</div>;
  if (cartItems.length === 0) return <div>Giỏ hàng trống</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              {item.productID ? (
                <>
                  <img
                    src={item.productID.productImage}
                    alt={item.productID.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.productID.productName}</h2>
                    <p className="text-red-600">{item.productID.price} VNĐ</p>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 italic">Sản phẩm không tồn tại hoặc đã bị xóa</div>
              )}
            </div>
            <button
              onClick={() => handleRemoveFromCart(item._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
