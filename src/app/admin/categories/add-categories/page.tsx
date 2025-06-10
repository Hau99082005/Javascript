"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAddNewCategories() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    desc: "",
    
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
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.name,
          image: formData.image,
          desc: formData.desc,
        }),
      });

      if (response.ok) {
        router.push('/admin/categories/all-categories');
      }
    } catch (error) {
      console.error('Error adding categories:', error);
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
            value={formData.image}
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
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả</label>
          <Textarea
            name="description"
            value={formData.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Thêm Danh Mục
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/categories/all-categories')}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}