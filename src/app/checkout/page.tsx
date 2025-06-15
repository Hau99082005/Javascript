'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { GlobalContext } from '@/context/page';
import { fetchAllAddresses } from '@/services/address/address';
import { Button } from '@/components/ui/button';

export default function Checkout() {
  const { cartItems, Addresses, user, setAddresses } = useContext(GlobalContext);
  const items = cartItems?.data ?? [];

  console.log(cartItems);

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id)
    if(res.success) {
      setAddresses(res.data);
    }
  }

  const handleUpdateAddress = (address: any) => {
    // Xử lý khi người dùng chọn địa chỉ
    console.log('Selected address:', address);
    // Thêm logic xử lý địa chỉ được chọn ở đây
  };

  useEffect(() => {
    if(user !== null) getAllAddresses()
  },[user])
 
  console.log(Addresses);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <h2 className="font-medium text-xl mb-4">Tóm tắt giỏ hàng</h2>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <Image
                    src={item.productID?.productImage || '/default-image.jpg'}
                    alt={item.productID?.productName || 'Ảnh sản phẩm'}
                    width={100}
                    height={100}
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold text-lg">
                      {item.productID?.productName}
                    </span>
                    <span className="text-gray-600">
                      Giá: {item.productID?.productPrice?.toLocaleString()}₫
                    </span>
                    <span className="text-gray-600">Số lượng: {item.quantity}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600 px-4 py-2 rounded border">
                Giỏ hàng của bạn rỗng!
              </div>
            )}
          </div>
        </div>
        <div className='text-xl bg-gray-50 px-4 pt-8 lg:mt-0'>
         <p className='text-xl font-medium'>Chi tiết địa chỉ giao hàng</p>
         <p className='text-gray-500 font-bold'>Hoàn tất đơn hàng của bạn bằng cách chọn địa chỉ bên dưới</p>
         <div className='w-full mt-6 mr-0 mb-0 ml-0 space-y-0'>
          {Addresses && Addresses.length > 0 ? (
            Addresses.map(item => (
              <div key={item._id} className='border p-6'>
                <p>Tên của bạn: {item.name}</p>
                <p>Địa chỉ: {item.address}</p>
                <p>Thành phố: {item.city}</p>
                <p>Đất nước: {item.country}</p>
                <p>Mã bưu chính: {item.postalCode}</p>
              <Button
        onClick={() => handleUpdateAddress(item)}
        className="w-full px-5 py-4 rounded-xl text-white font-bold text-lg uppercase transition-all duration-300 ease-in-out bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg focus:outline-none active:scale-95"
        style={{ fontFamily: 'Lato', border: "none", borderRadius: "10px", fontSize: "20px", fontWeight: "bold" }}
      >
        Chọn Địa Chỉ
      </Button>

              </div>
            ))
          ) : (
            <p>Không tồn tại địa chỉ nào!</p>
          )}
         </div>
        </div>
      </div>
    </div>
  );
}
