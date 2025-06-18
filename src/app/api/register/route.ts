import Joi from "joi";
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure connection is established

    const { name, email, password, role } = await req.json();

    // Validate dữ liệu đầu vào
    const { error } = schema.validate({ name, email, password, role });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Kiểm tra email đã tồn tại
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    // Mã hoá mật khẩu
    const hashPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    const newlyCreatedUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    console.log("User created successfully:", newlyCreatedUser); // Debug log

    return NextResponse.json({
      success: true,
      message: "Đăng ký tài khoản thành công!",
      user: {
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        role: newlyCreatedUser.role,
      },
    });
  } catch (err : any) {
    console.error("Lỗi khi đăng ký:", err);
    return NextResponse.json({
      success: false,
      message: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
      error: err.message, // Return error for debugging
    });
  }
}