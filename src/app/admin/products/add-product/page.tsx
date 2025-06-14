'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid' // For unique product codes
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AdminAddNewProduct() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: '',
    productName: '',
    productImage: '',
    productPrice: '',
    productPriceOld: '',
    quantity: '',
    actor: '',
    pages: '',
    date: '',
    description: '',
    id_category: '',
  })
  console.log(formData.id_category)
  // Basic validation for form fields
  const validateForm = () => {
    if (
      !formData.id ||
      !formData.productName ||
      !formData.productImage ||
      !formData.id_category
    ) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc')
      return false
    }
    if (
      isNaN(Number(formData.productPrice)) ||
      Number(formData.productPrice) <= 0
    ) {
      toast.error('Giá tiền phải là số dương')
      return false
    }
    if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      toast.error('Số lượng phải là số không âm')
      return false
    }
    if (formData.date && isNaN(Date.parse(formData.date))) {
      toast.error('Ngày không hợp lệ')
      return false
    }
    return true
  }
  interface Category {
    id: string
    name: string
    image: string
    desc: string
  }
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch Categories:', error)
      }
    }

    fetchCategories()
  }, [])
  console.log({ categories })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } =
      e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      id_category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    // ✅ Lấy _id MongoDB tương ứng với id_category từ form
    const selectedCategory = categories.find(
      (cat) => cat.id === formData.id_category,
    )

    if (!selectedCategory) {
      toast.error('Không tìm thấy danh mục phù hợp')
      return
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: String(formData.id),
          productPrice: Number(formData.productPrice),
          productPriceOld: Number(formData.productPriceOld) || 0,
          quantity: Number(formData.quantity),
          pages: Number(formData.pages) || 0,
          date: formData.date ? new Date(formData.date) : null,

          // ✅ Thay id_category bằng _id thật
          id_category: (selectedCategory as any)._id,
          productcode: uuidv4(),
        }),
      })

      if (response.ok) {
        toast.success('Thêm sản phẩm thành công')
        router.push('/admin/products/all-products')
      } else {
        const errorData = await response.json()
        toast.error(
          `Thêm sản phẩm thất bại: ${
            errorData.error || 'Lỗi không xác định'
          }`,
        )
      }
    } catch (error) {
      toast.error('Lỗi máy chủ. Vui lòng thử lại sau.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8 font-lato font-bold">
          Thêm sản phẩm mới
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
             <div>
              <label
                htmlFor="id"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                id<span className="text-red-600"> *</span>
              </label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="productName"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Tên sản phẩm<span className="text-red-600"> *</span>
              </label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="productImage"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Link hình ảnh<span className="text-red-600"> *</span>
              </label>
              <Input
                id="productImage"
                name="productImage"
                value={formData.productImage}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productPrice"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Giá tiền<span className="text-red-600"> *</span>
              </label>
              <Input
                id="productPrice"
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
                min="0"
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="productPriceOld"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Giá cũ
              </label>
              <Input
                id="productPriceOld"
                type="number"
                name="productPriceOld"
                value={formData.productPriceOld}
                onChange={handleChange}
                min="0"
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="quantity"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Số lượng<span className="text-red-600"> *</span>
              </label>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="actor"
                className="block font-medium mb-1 text-blue-600 font-lato text-xl"
              >
                Tác giả<span className="text-red-600"> *</span>
              </label>
              <Input
                id="actor"
                name="actor"
                value={formData.actor}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="pages"
              className="block font-medium mb-1 text-blue-600 font-lato text-xl"
            >
              Số trang
            </label>
            <Input
              id="pages"
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              min="0"
              className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block font-medium mb-1 text-blue-600 font-lato text-xl"
            >
              Thời gian<span className="text-red-600"> *</span>
            </label>
            <Input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium mb-1 text-blue-600 font-lato text-xl"
            >
              Mô tả<span className="text-red-600"> *</span>
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="id_category"
              className="block font-medium mb-1 text-blue-600 font-lato text-xl"
            >
              ID danh mục<span className="text-red-600"> *</span>
            </label>
            <Select
              name="id_category"
              value={formData.id_category}
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger id="id_category" className="w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="flex flex-wrap gap-6 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                className="w-5 h-5 rounded"
              />
              <span>Sản phẩm phổ biến</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="recommend"
                checked={formData.recommend}
                onChange={handleChange}
                className="w-5 h-5 rounded"
              />
              <span>Sản phẩm đề xuất</span>
            </label>
          </div> */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition font-lato text-xl hover:shadow-lg"
            >
              Thêm sản phẩm
            </button>
            <button
              type="button"
              onClick={() =>
                router.push('/admin/products/all-products')
              }
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow transition font-lato text-xl hover:shadow-lg"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
