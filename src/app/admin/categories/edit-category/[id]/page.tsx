"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Category {
   _id: string;
  name: string;
  image: string;
  desc: string;
}

export default function EditCategory({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Category>({
    _id: "",
    name: "",
    image: "",
    desc: "",
  });

  useEffect(() => {
    fetchCategory();
  }, [params.id]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${params.id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching Category:', error);
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
      const response = await fetch(`/api/categories/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: String(formData.image),
          name: String(formData.name),
          desc: String(formData.desc),
        }),
      });

      if (response.ok) {
        router.push('/admin/categories/all-categories');
      }
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sửa Danh Mucj</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-1">Tên Danh Mục</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Link hình ảnh</label>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">desc</label>
            <Input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
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