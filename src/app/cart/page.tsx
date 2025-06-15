"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { getAllCartItems } from "@/services/cart/cart";
import { X, Plus, Minus, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  _id: string;
  productID: {
    _id: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productPriceOld?: number;
    quantity: number;
  };
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();
  const [selectAll, setSelectAll] = useState(true);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const total = cartItems.reduce((sum, item) => {
    if (!selected[item._id]) return sum;
    return sum + item.productID.productPrice * item.quantity;
  }, 0);
  useEffect(() => {
    const fetchCartItems = async () => {
      const userID = localStorage.getItem("userID");
      if (!userID) {
        toast.error("Vui lòng đăng nhập để xem giỏ hàng!");
        router.push("/login");
        return;
      }
      const data = await getAllCartItems(userID);
      if (data.success) {
        setCartItems(data.data);
        updateCartCount(data.data.length);
        const initSel: Record<string, boolean> = {};
        data.data.forEach((i: CartItem) => (initSel[i._id] = true));
        setSelected(initSel);
      } else {
        toast.error(data.message || "Không thể lấy danh sách giỏ hàng!");
      }
      setLoading(false);
    };
    fetchCartItems();
  }, [router, updateCartCount]);
  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart/delete-from-cart?id=${cartItemId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(cartItems.filter((item) => item._id !== cartItemId));
        updateCartCount(cartItems.length - 1);
        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
        const newSel = { ...selected };
        delete newSel[cartItemId];
        setSelected(newSel);
      } else {
        toast.error(data.message || "Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const prev = [...cartItems];
    setCartItems(prev.map((it) => (it._id === cartItemId ? { ...it, quantity: newQuantity } : it)));
    try {
      const res = await fetch(`/api/cart/update-quantity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      });
      const data = await res.json();
      if (!data.success) setCartItems(prev);
    } catch (e) {
      setCartItems(prev);
    }
  };

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    const newSel: Record<string, boolean> = {};
    cartItems.forEach((i) => (newSel[i._id] = newVal));
    setSelected(newSel);
  };

  const toggleSelect = (id: string) => {
    const newSel = { ...selected, [id]: !selected[id] };
    setSelected(newSel);
    setSelectAll(Object.values(newSel).every(Boolean));
  };

  const handleCheckout = () => router.push("/checkout");
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-[6px] border-red-600 border-t-transparent"
        />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
  <h1 className="text-4xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Lato', fontSize: "30px", fontWeight: "bolder" }}>
    🛒 Giỏ hàng của bạn đang trống!
  </h1>
  <p className="text-gray-500 mb-6 text-lg" style={{ fontFamily: 'Lato', fontSize: "20px", fontWeight: "lighter" }}>
    Hãy khám phá thêm nhiều sản phẩm thú vị đang chờ bạn.
  </p>
  <Link
    href="/"
    className="px-6 py-3 bg-red-600 text-white text-lg rounded-full hover:bg-red-700 transition-all duration-300 shadow-md"
    style={{ fontFamily: 'Lato', textDecoration: "none",fontSize: "20px", fontWeight: "bold" }}
  >
    Tiếp tục mua sắm
  </Link>
</div>

    );
  }
  return (
    <div className="min-h-screen bg-red-50 py-10">
      <div className="container mx-auto px-4 lg:flex lg:space-x-6">
        <div className="flex-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="hidden lg:grid grid-cols-12 gap-4 font-semibold px-6 py-3 bg-red-100 text-gray-600 text-sm">
              <div className="col-span-5 flex items-center space-x-2">
                <button onClick={toggleSelectAll} aria-label="Chọn tất cả">
                  {selectAll ? <CheckSquare size={18} /> : <Square size={18} />}
                </button>
                <span>Chọn tất cả ({cartItems.length} sản phẩm)</span>
              </div>
              <div className="col-span-3 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Thành tiền</div>
              <div className="col-span-2" />
            </div>
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-5 border-t hover:bg-gray-50 group"
                >
                  <div className="col-span-12 lg:col-span-5 flex items-start space-x-3">
                    <button onClick={() => toggleSelect(item._id)} aria-label="Chọn">
                      {selected[item._id] ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <div className="relative w-20 h-24 flex-shrink-0 rounded overflow-hidden border">
                      <Image
                        src={item.productID.productImage}
                        alt={item.productID.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <h3 className="text-sm font-medium line-clamp-2 mb-1"
                      style={{fontFamily: "Lato", fontWeight: "bolder", fontSize: "18px", textDecoration: "none",
                        color: "black"
                      }}>
                        {item.productID.productName}
                      </h3>
                      <div className="text-xs text-gray-500 line-through" style={{fontFamily: "Lato", fontSize: "16px"}}>
                        {item.productID.productPriceOld?.toLocaleString("vi-VN")}đ
                      </div>
                      <div className="text-base font-semibold text-red-600"
                      style={{fontFamily: "Lato", fontSize: "16px"}}>
                        {item.productID.productPrice.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 lg:col-span-3 flex items-center justify-center lg:justify-between space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Giảm số lượng"
                      onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                      <Minus size={16} />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Tăng số lượng"
                      onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      className="border border-gray-300 hover:bg-gray-100">
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="col-span-4 lg:col-span-2 flex items-center justify-end text-sm font-semibold text-red-600"
                  style={{fontFamily: "Lato", fontSize: "16px"}}>
                    {(item.productID.productPrice * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                  <div className="col-span-2 hidden lg:flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Xóa"
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="hover:bg-red-50">
                      <X size={20}
                      style={{fontSize: "30px"}} className="text-gray-500 group-hover:text-red-600 transition-colors" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:w-96 mt-10 lg:mt-0 space-y-6"> 
          <Card className="shadow-lg">
          <CardHeader className="p-5 border-b space-y-4">
  <h2
    className="text-xl font-semibold text-gray-800"
    style={{ fontFamily: "Lato", fontSize: "25px", fontWeight: "bold" }}
  >
    Tóm tắt đơn hàng
  </h2>

  <div className="space-y-3">
    {cartItems.map((item) => (
      <div
        key={item._id}
        className="flex justify-between items-start text-sm text-gray-700"
      >
        <div className="flex-1 pr-4">
          <p className="font-medium">{item.productID.productName}</p>
        </div>
        <div className="text-right font-semibold">x{item.quantity}</div>
       </div>
      ))}
       </div>
         </CardHeader>
            <CardContent className="p-5 space-y-4 text-sm">
              <div className="flex justify-between" style={{fontSize: "18px", fontFamily: "Lato"}}>
                <span>Thành tiền</span>
                <span>{total.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-red-600"
              style={{fontSize: "18px", fontFamily: "Lato"}}>
                <span>Tổng Số Tiền (gồm VAT)</span>
                <span>{total.toLocaleString("vi-VN")}đ</span>
              </div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  disabled={total === 0}
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 h-12 text-base font-semibold rounded"
                  style={{fontFamily: "Lato", fontWeight: "bold"}}
                >
                  THANH TOÁN
                </Button>
              </motion.div>
              <p className="text-[11px] text-gray-500 text-center"
              style={{fontFamily: "Lato", fontWeight: "lighter", fontSize: "16px"}}>
                (Giảm giá trên web chỉ áp dụng cho bán lẻ)
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}