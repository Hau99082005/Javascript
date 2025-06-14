import express from 'express';
import Category from '@/models/categories';

const categoryRoute = express.Router();

// POST: Create a category
categoryRoute.post('/api/categories', async (req, res) => {
  try {
    const {id, name, image, desc } = req.body;
    if (!id || !name || !image || !desc) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const category = new Category({ id,name, image, desc });
    await category.save();
    res.status(201).json(category);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// GET: Get all categories
categoryRoute.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default categoryRoute;
