'use client'

import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Contacts from "@/components/Contacts";
import Entertaiments from "@/components/Entertaiments";
import Members from "@/components/Members";
import Movie from "@/components/Movie";
import Promotion from "@/components/Promotion";
import Tickers from "@/components/Tickers";
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
      <Tickers/>
      <Card/>
      <Movie/>
      <Promotion/>
      <Members/>
      <Entertaiments/>
      <Contacts/>
    </div>
  );
}
