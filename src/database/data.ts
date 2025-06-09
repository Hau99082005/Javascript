import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const configOptions: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions; 

const connectToDB = async (): Promise<void> => {
  const connectUrl = process.env.MONGO_URI;
  if (!connectUrl) {
    console.error("❌ MONGO_URI không được định nghĩa trong file .env");
    return;
  }

  try {
    await mongoose.connect(connectUrl, configOptions);
    console.log("✅ Đã kết nối đến MongoDB");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("❌ Kết nối với MongoDB thất bại:", e.message);
  }
};

export default connectToDB;
