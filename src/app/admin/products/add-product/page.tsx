"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productPrice: Number(formData.productPrice),
          productPriceOld: Number(formData.productPriceOld) || 0,
          quantity: Number(formData.quantity),
          pages: Number(formData.pages) || 0,
          date: new Date(),
          productcode: Math.random().toString(36).substring(7),
        }),
      });

      if (response.ok) {
        toast.success("Thêm sản phẩm thành công");
        router.push("/admin/products/all-products");
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
        toast.error(`Thêm sản phẩm thất bại: ${errorData.error || "Lỗi không xác định"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Lỗi máy chủ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        <h1
          className="text-3xl font-semibold text-center text-blue-600 mb-8"
          style={{ fontSize: "25px", fontFamily: "Lato", fontWeight: "bolder" }}
        >
          Thêm sản phẩm mới
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Tên sản phẩm<span className="text-red-600"> *</span>
              </label>
              <Input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Link hình ảnh<span className="text-red-600"> *</span>
              </label>
              <Input
                name="productImage"
                value={formData.productImage}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Giá Tiền<span className="text-red-600"> *</span>
              </label>
              <Input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Giá cũ<span className="text-red-600"> *</span>
              </label>
              <Input
                type="number"
                name="productPriceOld"
                value={formData.productPriceOld}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Số lượng<span className="text-red-600"> *</span>
              </label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Tác giả<span className="text-red-600"> *</span>
              </label>
              <Input
                name="actor"
                value={formData.actor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block font-medium mb-1 text-blue-600"
              style={{ fontFamily: "Lato", fontSize: "20px" }}
            >
              Số trang<span className="text-red-600"> *</span>
            </label>
            <Input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block font-medium mb-1 text-blue-600"
              style={{ fontFamily: "Lato", fontSize: "20px" }}
            >
              Mô tả<span className="text-red-600"> *</span>
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Danh mục<span className="text-red-600"> *</span>
              </label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block font-medium mb-1 text-blue-600"
                style={{ fontFamily: "Lato", fontSize: "20px" }}
              >
                Danh mục con<span className="text-red-600"> *</span>
              </label>
              <Input
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-2">
            <label className="flex items-center space-x-2 gap-2">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                style={{ width: "20px", height: "20px", border: "none", borderRadius: "5px" }}
              />
              <span>Sản phẩm phổ biến</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="recommend"
                checked={formData.recommend}
                onChange={handleChange}
                style={{ width: "20px", height: "20px", border: "none", borderRadius: "5px" }}
              />
              <span>Sản phẩm đề xuất</span>
            </label>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
              style={{ border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "20px" }}
            >
              Thêm sản phẩm
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/products/all-products")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow transition"
              style={{ border: "none", borderRadius: "5px", fontSize: "20px", fontFamily: "Lato" }}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}