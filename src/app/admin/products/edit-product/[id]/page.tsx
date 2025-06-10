"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productPriceOld: number;
  quantity: number;
  actor: string;
  pages: number;
  description: string;
  category: string;
  subcategory: string;
  popular: boolean;
  recommend: boolean;
}

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    _id: "",
    productName: "",
    productImage: "",
    productPrice: 0,
    productPriceOld: 0,
    quantity: 0,
    actor: "",
    pages: 0,
    description: "",
    category: "",
    subcategory: "",
    popular: false,
    recommend: false,
  });

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

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
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productPrice: Number(formData.productPrice),
          productPriceOld: Number(formData.productPriceOld),
          quantity: Number(formData.quantity),
          pages: Number(formData.pages),
        }),
      });

      if (response.ok) {
        router.push('/admin/products/all-products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sửa sản phẩm</h1>
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
              value={Number(formData.productPrice).toLocaleString('de-DE')}
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
              value={Number(formData.productPriceOld).toLocaleString('de-DE')}
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
            Cập nhật
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