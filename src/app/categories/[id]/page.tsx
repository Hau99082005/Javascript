"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  productPrice: number;
}

export default function CategoryPage() {
  const { id } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`/api/products?category=${id}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products || [])
          setLoading(false)
        })
    }
  }, [id])

  if (loading) return <div className="p-10 text-center text-lg">Đang tải sản phẩm...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm của danh mục</h1>
      {products.length === 0 ? (
        <div className="text-gray-500">Không có sản phẩm nào trong danh mục này.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id} className="block bg-white rounded-lg shadow hover:shadow-lg p-4 transition-all">
              <div className="relative w-full h-40 mb-3">
                <Image src={product.productImage || "/default-image.jpg"} alt={product.productName} fill className="object-contain rounded" />
              </div>
              <div className="font-semibold mb-1">{product.productName}</div>
              <div className="text-red-600 font-bold">{product.productPrice?.toLocaleString("vi-VN")} ₫</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 