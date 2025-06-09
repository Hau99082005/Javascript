import express from 'express';
import OutStanding from '@/models/outstanding';

const OutStandingRouter = express.Router();

OutStandingRouter.post('/api/outstanding', async(req, res) => {{
    try {
        const {name, image} = req.body;
        if(!name || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const outstanding = new OutStanding({name, image});
        await outstanding.save();
         res.status(201).json(outstanding);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e :any) {
        res.status(500).json({ error: e.message });
    }
}});

OutStandingRouter.get('/api/outstanding', async(req, res) => {
    try {
        const outstanding = await OutStanding.find();
        res.status(200).json(outstanding);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default OutStandingRouter;