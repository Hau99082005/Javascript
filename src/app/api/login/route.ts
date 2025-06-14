import Joi from "joi";
import { NextResponse } from "next/server";
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "@/models/user";
import connectDB from "@/lib/mongodb";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();
    const { error } = schema.validate({ email, password });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        }, { status: 400 });
    }

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: "Thông tin đăng nhập không chính xác",
            }, { status: 401 });
        }
        const checkPassword = await compare(password, checkUser.password!);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "Thông tin đăng nhập không chính xác",
            }, { status: 401 });
        }

        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            role: checkUser.role,
        }, process.env.JWT_SECRET || "default_secret_key", { 
            expiresIn: '1d',
            algorithm: 'HS256'
        });

        const finalData = {
            token,
            user: {
                email: checkUser.email,
                name: checkUser.name,
                _id: checkUser._id,
                role: checkUser.role,
            }
        };

        return NextResponse.json({
            success: true,
            message: "Đăng Nhập Thành công",
            finalData,
        }, { status: 200 });

    } catch (e) {
        console.error("Lỗi khi đăng nhập:", e);
        return NextResponse.json({
            success: false,
            message: "Có lỗi xảy ra, vui lòng thử lại sau",
        }, { status: 500 });
    }
}
