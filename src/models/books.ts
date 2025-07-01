import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
});

export default mongoose.models.books || mongoose.model('books', bookSchema);