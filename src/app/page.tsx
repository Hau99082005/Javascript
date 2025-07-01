"use client";
import Banner from "@/components/Banner";
import BookRanking from "@/components/BookRanking";
import Books from "@/components/Books";
import { BrandHighlightList } from "@/components/BrandHighlight/BrandHighlightList";
import Outstanding from "@/components/OutStanding";
import ProductCard from "@/components/ProductCard";
import SuggestedBooks from "@/components/SuggestedBooks";
// import { GlobalContext } from "@/context/page";
// import { useContext } from "react";

export default function Home() {
  // const {isAuthUser} = useContext(GlobalContext);
  return (
    <div className="pt-[5px] w-full max-w-screen-xl mx-auto">
      <Banner />
      <Outstanding/>
      <ProductCard/>
      <Books/>
      <BookRanking/>
      <BrandHighlightList/>
      <SuggestedBooks/>
    </div>
  );
}
