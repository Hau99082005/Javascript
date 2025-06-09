import connectToDB from "@/database/data";
import Joi from "joi";
import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcrypt"; 

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  // Validate dữ liệu đầu vào
  const { error } = schema.validate({ name, email, password, role });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
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

    return NextResponse.json({
      success: true,
      message: "Đăng ký tài khoản thành công!",
      user: {
        name: newlyCreatedUser.name,
        email: newlyCreatedUser.email,
        role: newlyCreatedUser.role,
      },
    });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    return NextResponse.json({
      success: false,
      message: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
    });
  }
}
