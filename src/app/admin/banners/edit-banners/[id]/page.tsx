"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSave, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";

interface Banner {
  _id: string;
  image: string;
  desc: string;
}

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditBannerPage({ params }: { params: any }) {
  const router = useRouter();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [image, setImage] = useState<string | File>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBanner();
  }, [params.id]);

  useEffect(() => {
    if (banner) setImage(banner.image);
  }, [banner]);

  const fetchBanner = async () => {
    try {
      const response = await fetch(`/api/banners/${params.id}`);
      const data = await response.json();
      setBanner(data);
    } catch (error) {
      console.error("Error fetching Banner:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (banner) {
      setBanner({
        ...banner,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Chỉ hỗ trợ file ảnh!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!banner) return;
    if (!banner.desc.trim()) {
      setError("Vui lòng nhập mô tả!");
      return;
    }
    setUploading(true);
    try {
      let response;
      if (image instanceof File) {
        const data = new FormData();
        data.append("image", image);
        data.append("desc", banner.desc);
        response = await fetch(`/api/banners/${params.id}`, {
          method: "PUT",
          body: data,
        });
      } else {
        response = await fetch(`/api/banners/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image, desc: banner.desc }),
        });
      }
      setUploading(false);
      if (response.ok) {
        toast.success("Cập nhật Banner thành công!");
        router.push("/admin/banners/all-banners");
      } else {
        const res = await response.json();
        setError(res.message || "Lỗi không xác định!");
      }
    } catch (error) {
      setUploading(false);
      setError("Lỗi kết nối server!");
    }
  };

  if (banner === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-8 text-blue-700 flex items-center gap-3 justify-center drop-shadow-sm"
         style={{fontFamily: "Lato"}}>
          Sửa Banner
        </h1>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-lg">Hình Ảnh</label>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition hover:border-blue-400 bg-blue-50 ${error ? 'border-red-400' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              {preview ? (
                <Image src={preview} alt="Preview" width={400} height={180} className="rounded-xl shadow mb-2 object-cover" style={{maxHeight:180}} />
              ) : typeof image === "string" && image ? (
                <Image src={image} alt="Banner" width={400} height={180} className="rounded-xl shadow mb-2 object-cover" style={{maxHeight:180}} />
              ) : (
                <span className="text-gray-400 text-lg">Kéo & thả hoặc bấm để chọn ảnh</span>
              )}
              <Input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {error && <div className="text-red-500 mt-2 text-sm font-semibold">{error}</div>}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-lg">Mô Tả</label>
            <Textarea
              name="desc"
              value={banner.desc}
              onChange={handleChange}
              placeholder="Nhập mô tả banner..."
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-200 text-base"
              rows={3}
            />
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-2.5 rounded-xl font-bold text-lg shadow hover:scale-105 transition disabled:opacity-60"
              style={{fontFamily: "Lato"}}
              disabled={uploading}
            >
              {uploading ? "Đang lưu..." : "Lưu"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/banners/all-banners")}
              className="bg-gray-400 text-white px-8 py-2.5 rounded-xl font-bold text-lg shadow hover:bg-gray-500 transition"
              style={{fontFamily: "Lato", border: "none", borderRadius: "10px"}}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}