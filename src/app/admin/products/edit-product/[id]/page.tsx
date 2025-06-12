"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  productcode: string;
}

export default function EditProduct() {
  const { productcode } = useParams() as { productcode: string };
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
    productcode: "",
  });

  useEffect(() => {
    if (productcode) fetchProduct();
  }, [productcode]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productcode}`);
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
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${productcode}`, {
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
            <label className="block font-semibold mb-1">Link hình ảnh</label>
            <Input
              name="productImage"
              value={formData.productImage}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Danh mục</label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Danh mục con</label>
              <Input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium">Sản phẩm phổ biến</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="recommend"
                checked={formData.recommend}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium">Sản phẩm đề xuất</span>
            </label>
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