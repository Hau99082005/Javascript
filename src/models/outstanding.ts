import mongoose from "mongoose";

const OutstandingSchema = new mongoose.Schema({
    name: String,
    image: String,
});

const OutStanding = mongoose.models.OutStanding || mongoose.model("OutStanding", OutstandingSchema);
export default OutStanding;