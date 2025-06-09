import express from "express";
import books from "@/models/books";

const booksRouter = express.Router();

booksRouter.post('/api/books', async (req, res) => {
  try {
    const {  image, name } = req.body;
    if ( !image || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const book = new books({  image, name });
    await book.save();
    res.status(201).json(book);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

booksRouter.get('/api/books', async (req, res) => {
  try {
    const book = await books.find();
    res.status(200).json(book);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default booksRouter;
