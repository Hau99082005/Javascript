import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/products";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: any }
) {
  try {
    await connectDB();
    const realParams = typeof params.then === 'function' ? await params : params;
    const product = await Product.findById(realParams.productcode);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: any }
) {
  try {
    await connectDB();
    const contentType = request.headers.get('content-type') || '';
    const realParams = typeof params.then === 'function' ? await params : params;
    let updated;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('image') as File | null;
      let imagePath = undefined;
      if (file) {
        // Lưu file ảnh vào public/uploads
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const filename = Date.now() + '-' + (file && 'name' in file && file.name ? file.name : 'product.jpg');
        const filepath = path.join(uploadDir, filename);
        await fs.writeFile(filepath, buffer);
        imagePath = '/uploads/' + filename;
      }
      // Only update fields that are present in the form
      const updateData: any = {};
      const fields = [
        'productName', 'productPrice', 'productPriceOld', 'quantity', 'actor',
        'pages', 'description', 'category', 'id_category', 'productcode', 'date'
      ];
      fields.forEach(field => {
        const value = formData.get(field);
        if (value !== null && value !== undefined && value !== '') {
          updateData[field] = value;
        }
      });
      if (formData.get('productPrice')) updateData.productPrice = Number(formData.get('productPrice'));
      if (formData.get('productPriceOld')) updateData.productPriceOld = Number(formData.get('productPriceOld'));
      if (formData.get('quantity')) updateData.quantity = Number(formData.get('quantity'));
      if (formData.get('pages')) updateData.pages = Number(formData.get('pages'));
      if (formData.get('date')) updateData.date = new Date(formData.get('date') as string);
      if (imagePath !== undefined) updateData.productImage = imagePath;
      updated = await Product.findByIdAndUpdate(
        realParams.productcode,
        updateData,
        { new: true, runValidators: true }
      );
    } else {
      const body = await request.json();
      updated = await Product.findByIdAndUpdate(
        realParams.productcode,
        body,
        { new: true, runValidators: true }
      );
    }
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: any }
) {
  try {
    await connectDB();
    const realParams = typeof params.then === 'function' ? await params : params;
    const product = await Product.findByIdAndDelete(realParams.productcode);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 