import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/products'
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category')
    let products
    if (categoryId) {
      products = await Product.find({ id_category: categoryId })
    } else {
      products = await Product.find({})
    }
    return NextResponse.json( products )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const contentType = request.headers.get('content-type') || '';
    let product;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('image') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'Thiếu ảnh sản phẩm' }, { status: 400 });
      }
      // Lưu file ảnh vào public/uploads
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      const filename = Date.now() + '-' + (file.name || 'product.jpg');
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      const imagePath = '/uploads/' + filename;
      // Parse các trường còn lại
      const productData: any = {
        productName: formData.get('productName'),
        productImage: imagePath,
        productPrice: Number(formData.get('productPrice')),
        productPriceOld: Number(formData.get('productPriceOld')) || 0,
        quantity: Number(formData.get('quantity')),
        actor: formData.get('actor'),
        pages: Number(formData.get('pages')) || 0,
        date: formData.get('date') ? new Date(formData.get('date') as string) : null,
        description: formData.get('description'),
        id_category: formData.get('id_category'),
        productcode: formData.get('productcode'),
      };
      product = await Product.create(productData);
    } else {
      const body = await request.json();
      product = await Product.create(body);
    }
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/products error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 },
    )
  }
}
