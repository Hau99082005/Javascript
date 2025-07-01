"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  productcode: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  desc: string;
  _id: string;
}

export default function EditProduct() {
  const { id } = useParams() as { id: string };
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
    productcode: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (formData.productImage) setPreview(formData.productImage);
  }, [formData.productImage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch Categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.status === 404) {
        alert("Sản phẩm không tồn tại hoặc đã bị xóa!");
        router.push("/admin/products/all-products");
        return;
      }
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server trả về dữ liệu không hợp lệ!");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Lỗi máy chủ!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (imageFile) {
        const data = new FormData();
        data.append("productName", formData.productName);
        data.append("image", imageFile);
        data.append("productPrice", String(formData.productPrice));
        data.append("productPriceOld", String(formData.productPriceOld));
        data.append("quantity", String(formData.quantity));
        data.append("actor", formData.actor);
        data.append("pages", String(formData.pages));
        data.append("description", formData.description);
        data.append("category", formData.category);
        response = await fetch(`/api/products/${id}`, {
          method: "PUT",
          body: data,
        });
      } else {
        response = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            productPrice: Number(formData.productPrice),
            productPriceOld: Number(formData.productPriceOld),
            quantity: Number(formData.quantity),
            pages: Number(formData.pages),
          }),
        });
      }
      if (response.ok) {
        router.push("/admin/products/all-products");
      } else {
        const errorData = await response.json();
        console.error("Failed to update product:", errorData);
        alert("Cập nhật thất bại: " + (errorData.error || "Không tìm thấy sản phẩm"));
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Lỗi máy chủ");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Cập nhật sản phẩm
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Tên sản phẩm</label>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Hình ảnh sản phẩm</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition hover:border-blue-400 bg-blue-50"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              {preview ? (
                <Image src={preview} alt="Preview" width={200} height={200} className="rounded-xl shadow mb-2 object-cover" style={{maxHeight:200}} />
              ) : (
                <span className="text-gray-400 text-lg">Kéo & thả hoặc bấm để chọn ảnh</span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                name="productImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Giá (VNĐ)</label>
              <Input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Giá cũ (VNĐ)</label>
              <Input
                type="number"
                name="productPriceOld"
                value={formData.productPriceOld}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Số lượng</label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tác giả</label>
              <Input
                type="text"
                name="actor"
                value={formData.actor}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Số trang</label>
            <Input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mô tả</label>
            <Textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết sản phẩm..."
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              style={{ border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "20px", fontWeight: "bold" }}
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/products/all-products")}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
              style={{ border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "18px", fontWeight: "bold" }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}