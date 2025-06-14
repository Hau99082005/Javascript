import express, { Request, Response } from 'express';
import Product, { IProduct } from '@/models/products';

const productRoute = express.Router();

productRoute.post('/api/products', async (req: Request, res: Response) => {
  try {
    const {
      id,
      productName,
      productImage,
      productPrice,
      productPriceOld,
      date,
      productcode,
      quantity,
      actor,
      pages,
      description,
      id_category,
      popular,
      recommend
    } = req.body;

    const newProduct: IProduct = new Product({
      id,
      productName,
      productImage,
      productPrice,
      productPriceOld,
      date,
      productcode,
      quantity,
      actor,
      pages,
      description,
      id_category,
      popular,
      recommend
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

productRoute.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ popular: true });

    if (!products || products.length === 0) {
      return res.status(404).json({ msg: 'Products not found' });
    }

    return res.status(200).json(products);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default productRoute;
