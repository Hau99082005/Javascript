import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    image: String,
    name: String,
})

const books = mongoose.models.books || mongoose.model('Books', bookSchema);
export default books;