"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface Books {
  image: string;
  name: string;
}

export default function EditBooks({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Books>({
    image: "",
    name: "",
  });

  useEffect(() => {
    fetchBooks();
  }, [params.id]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching Books:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: String(formData.image),
          name: String(formData.name),
        }),
      });

      if (response.ok) {
        router.push("/admin/books/all-books");
      } else {
        console.error("Failed to update books:", await response.json());
      }
    } catch (error) {
      console.error("Error updating books:", error);
    }
  };

  const AddBooks = () => {
    toast.success("Thêm sách thành công!");
  }

  return (
    <div className="flex justify-center items-start p-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 border">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800"
        style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"}}>
          🖼️ Sửa Banner
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700"
             style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>
              Link hình ảnh
            </label>
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700"
             style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>
              Mô tả
            </label>
            <Textarea
              name="name"
              value={formData.name}
              onChange={handleChange}
              rows={3}
              className="w-full"
              placeholder="Mô tả ngắn gọn về banner"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button onClick={() => AddBooks()}
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200"
              style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>
              <FaSave /> Cập nhật
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/books/all-books")}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition duration-200"
              style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}
            >
              <FaTimes /> Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
