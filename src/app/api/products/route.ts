import { NextResponse } from "next/server";
import Product from "@/models/products";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const {productName ,productImage, productPrice,productPriceOld,date,productcode,quantity,
      actor,pages,description,category,subcategory,popular, recommend
     } = body;

    if ( !productName || !productImage || !productPrice || !productPriceOld|| !date || 
      !productcode || !quantity || !actor || !pages || !description || !category || !subcategory || !popular ||
      !recommend
    ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const product = await Product.create({  productName, productImage, productPrice, productPriceOld, date,
      productcode, quantity, actor, pages, description, category, subcategory, popular, recommend
     });

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error) {
    console.error("Error creating Product:", error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const connection = await connectDB();
    if (!connection) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');

    let products;
    if (searchQuery) {
      products = await Product.find({
        productName: { $regex: searchQuery, $options: 'i' }
      });
    } else {
      products = await Product.find({});
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ 
      message: "Error fetching products", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
