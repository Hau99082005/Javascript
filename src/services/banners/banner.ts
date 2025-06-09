import express from "express";
import Banner from "@/models/banner"; 

const bannerRouter = express.Router();

bannerRouter.post('/api/banners', async (req, res) => {
  try {
    const {  image, desc } = req.body;
    if ( !image || !desc) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const banner = new Banner({  image, desc });
    await banner.save();
    res.status(201).json(banner);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

bannerRouter.get('/api/banners', async (req, res) => {
  try {
    const banner = await Banner.find();
    res.status(200).json(banner);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default bannerRouter;
