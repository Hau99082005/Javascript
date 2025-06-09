"use client";
import Banner from "@/components/Banner";
import Books from "@/components/Books";
import Outstanding from "@/components/OutStanding";
import ProductCard from "@/components/ProductCard";
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
    </div>
  );
}
