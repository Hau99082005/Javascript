"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaSave, FaTimes } from "react-icons/fa";

interface Banner {
  _id: string;
  image: string;
  desc: string;
}

type Props = {
  params: {
    id: string;
  };
};

export default function EditBanner({ params }: Props) {
  const router = useRouter();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanner();
  }, [params.id]);

  const fetchBanner = async () => {
    try {
      const response = await fetch(`/api/banners/${params.id}`);
      const data = await response.json();
      setBanner(data);
    } catch (error) {
      console.error("Error fetching Banner:", error);
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!banner) return;

    try {
      const response = await fetch(`/api/banners/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banner),
      });

      if (response.ok) {
        router.push("/admin/banners");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!banner) {
    return <div>Banner not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Image URL</label>
          <Input
            type="text"
            name="image"
            value={banner.image}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <Textarea
            name="desc"
            value={banner.desc}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaSave className="inline mr-2" />
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/banners")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <FaTimes className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}