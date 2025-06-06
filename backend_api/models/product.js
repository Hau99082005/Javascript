const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String, trim: true, required: true },
    productImage: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productPriceOld: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    popular: { type: Boolean, default: false },
    recommend: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;