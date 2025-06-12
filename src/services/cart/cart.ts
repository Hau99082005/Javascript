import Cart from '@/models/cart';
import express from 'express';
import mongoose from 'mongoose';

const cartRoute = express.Router();

cartRoute.post('/api/cart/add-to-cart', async(req, res) => {
    try {
        const {userID, productID, quantity} = req.body;
    if(!userID || !productID || !quantity) {
        return res.status(400).json({message: "Missing required fields"});
    } 
    const cart = new Cart({userID, productID, quantity});
    await cart.save();
    res.status(200).json(cart);
    }catch(e: any) {
        res.status(500).json({error: e.message});
    }
})

cartRoute.get('/api/cart/all-cart-items', async(req, res) => {
   try {
      const cart = await Cart.find();
      res.status(200).json(cart);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
});

export default cartRoute;