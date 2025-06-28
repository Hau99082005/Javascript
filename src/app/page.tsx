"use client";
import Banner from "@/components/Banner";
import BookRanking from "@/components/BookRanking";
import Books from "@/components/Books";
import { BrandHighlightList } from "@/components/BrandHighlight/BrandHighlightList";
import { FlashSaleSection } from "@/components/FlashSale/FlashSaleSection";
import Outstanding from "@/components/OutStanding";
import ProductCard from "@/components/ProductCard";
import SuggestedBooks from "@/components/SuggestedBooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { GlobalContext } from "@/context/page";
// import { useContext } from "react";

interface Category {
  _id: string;
  name: string;
  image?: string;
}

export default function Home() {
  // const {isAuthUser} = useContext(GlobalContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <div className="pt-[5px] w-full max-w-screen-xl mx-auto">
      <Banner />
      <FlashSaleSection/>
      <Outstanding/>
      <ProductCard/>
      <Books/>
      <BookRanking/>
      <BrandHighlightList/>
      <SuggestedBooks/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => router.push(`/categories/${category._id}`)}
            className="cursor-pointer border rounded-lg p-4 shadow hover:bg-gray-100 transition"
          >
            {/* Hiển thị tên, hình ảnh danh mục */}
            <div className="font-semibold mb-2">{category.name}</div>
            {category.image && (
              <img src={category.image} alt={category.name} className="w-full h-24 object-cover rounded" />
            )}
          </div>
        ))}
      </div>
      <ProductCard />
      <SuggestedBooks />
    </div>
  );
}
