import express from 'express';
import Category from '@/models/categories';

const categoryRoute = express.Router();

categoryRoute.post('/api/categories', async (req, res) => {
  try {
    const { name, image, desc } = req.body;
    const category = new Category({ name, image, desc });
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

categoryRoute.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = categoryRoute;
