'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoIosAddCircle } from 'react-icons/io'
import { ArrowBigLeft } from 'lucide-react'

interface Product {
  _id: string
  id: string
  productName: string
  productImage: string
  productPrice: number
  productPriceOld: number
  quantity: number
  date: Date
  actor: string
  id_category: string
  productcode: string
}

export default function AdminAllProduct() {
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleDelete = async (productcode: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`/api/products/${productcode}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleEdit = (productcode: string) => {
    router.push(`/admin/products/edit-product/${productcode}`)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow transition-all duration-200"
            aria-label="Go back"
          >
            <ArrowBigLeft className="w-6 h-6" />
          </button>

          <h1
            className="text-2xl font-bold text-red-500"
            style={{
              fontFamily: 'Lato',
              fontSize: '30px',
              fontWeight: 'bold',
            }}
          >
            Quản lý sản phẩm
          </h1>
        </div>
        <button
          onClick={() => router.push('/admin/products/add-product')}
          className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl 
                 hover:bg-green-700 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
          style={{
            fontFamily: 'Lato',
            fontSize: '20px',
            fontWeight: 'bolder',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          <IoIosAddCircle size={28} />
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-sm">
              <th className="px-6 py-3 text-left">id_category</th>
              <th className="px-6 py-3 text-left">Hình ảnh</th>
              <th className="px-6 py-3 text-left">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left">Tác giả</th>
              <th className="px-6 py-3 text-left">Mã Hàng</th>
              <th className="px-6 py-3 text-left">Giá</th>
              <th className="px-6 py-3 text-left">Số lượng</th>
              <th className="px-6 py-3 text-left">Thời Gian</th>
              <th className="px-6 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-200 hover:bg-blue-50 transition-colors"
              >
               
              
                <td className="px-6 py-4 font-semibold text-gray-800 max-w-ws truncate">
                  {product.id_category}
                </td>
                 <td className="px-6 py-4">
                  <div className="relative w-16 h-16">
                    {product.productImage ? (
                      <Image
                        src={
                          product.productImage.startsWith('http')
                            ? product.productImage
                            : product.productImage.startsWith('/')
                            ? product.productImage
                            : '/' + product.productImage
                        }
                        alt={product.productName}
                        fill
                        className="object-cover rounded-full border border-blue-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full border border-blue-100">
                        No Image
                      </div>
                    )}
                  </div>
                </td>
                <td
                  className="px-6 py-4 font-semibold text-gray-800 max-w-xs truncate"
                  title={product.productName}
                >
                  {product.productName}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800 max-w-ws truncate">
                  {product.actor}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800 max-w-xs truncate">
                  {product.productcode}
                </td>
                <td className="px-6 py-4 text-blue-700 font-bold">
                  {product.productPrice.toLocaleString('vi-VN')}đ
                </td>
                <td className="px-6 py-4 text-center">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 text-center text-gray-700">
                  {new Date(product.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product.productcode)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1 rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-150"
                      style={{
                        border: 'none',
                        borderRadius: '5px',
                        fontFamily: 'Lato',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(product.productcode)
                      }
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1 rounded-lg shadow hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all duration-150"
                      style={{
                        border: 'none',
                        borderRadius: '5px',
                        fontFamily: 'Lato',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
