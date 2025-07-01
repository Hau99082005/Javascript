import { NextResponse } from "next/server";
import Product from "@/models/products";
import connectDB from "@/lib/mongodb";
import ProductDetail from "./ProductDetail";

async function getProduct(productcode: string) {
  try {
    await connectDB();
    const product = await Product.findOne({ productcode: decodeURIComponent(productcode) });
    if (!product) return null;
    
    // Convert Mongoose document to plain object with only the required fields
    const plainProduct = {
      productName: product.productName,
      productImage: product.productImage,
      productPrice: product.productPrice,
      productPriceOld: product.productPriceOld,
      productcode: product.productcode,
      quantity: product.quantity,
      actor: product.actor,
      pages: product.pages,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory
    };
    
    return plainProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { productcode: string } }) {
  const product = await getProduct(params.productcode);

  if (!product) {
    return (
      <div className="container py-5">
        <h1>Product not found</h1>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
