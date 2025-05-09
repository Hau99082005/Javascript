'use client'

import Banner from "@/components/Banner";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  useEffect(() => {
    fetch('/api/check-db')
      .then(res => res.json())
      .then(data => {
        if (data.success) toast.success(data.message);
        else toast.error(data.message);
      })
      .catch(() => toast.error('Lỗi khi gọi API kiểm tra MySQL'));
  }, []);

  return (
    <div className="w-full rounded-full">
      <Toaster richColors position="top-center"/>
      <Banner />
    </div>
  );
}
