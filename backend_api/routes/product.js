const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

productRouter.post('/api/add-products', async(req, res) => {
    try {
        const {
            productName,
            productImage,
            productPrice,
            productPriceOld,
            quantity,
            description,
            category,
            subcategory
        } = req.body;

        const product = new Product({
            productName,
            productImage,
            productPrice,
            productPriceOld,
            quantity,
            description,
            category,
            subcategory
        });

        await product.save();
        return res.status(201).send(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

productRouter.get('/api/popular-products', async(req, res) => {
    try {
        const product = await Product.find({ popular: true });
        if (!product || product.length === 0) {
            return res.status(404).json({ msg: "Products not found" });
        }
        return res.status(200).json({ product });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = productRouter;