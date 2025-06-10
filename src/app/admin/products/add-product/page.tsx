"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAddNewProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    productPrice: "",
    productPriceOld: "",
    quantity: "",
    actor: "",
    pages: "",
    description: "",
    category: "",
    subcategory: "",
    popular: false,
    recommend: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productPrice: Number(formData.productPrice).toLocaleString('de-DE'),
          productPriceOld: Number(formData.productPriceOld).toLocaleString('de-DE'),
          quantity: Number(formData.quantity),
          pages: Number(formData.pages),
          date: new Date(),
          productcode: Math.random().toString(36).substring(7),
        }),
      });

      if (response.ok) {
        router.push('/admin/products/all-products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-1">Tên sản phẩm</label>
          <Input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Link hình ảnh</label>
          <Input
            type="text"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Giá</label>
            <Input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Giá cũ</label>
            <Input
              type="number"
              name="productPriceOld"
              value={formData.productPriceOld}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Số lượng</label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Tác giả</label>
            <Input
              type="text"
              name="actor"
              value={formData.actor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Số trang</label>
          <Input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Danh mục</label>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Danh mục con</label>
            <Input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleChange}
              className="mr-2"
            />
            Sản phẩm phổ biến
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="recommend"
              checked={formData.recommend}
              onChange={handleChange}
              className="mr-2"
            />
            Sản phẩm đề xuất
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products/all-products')}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}