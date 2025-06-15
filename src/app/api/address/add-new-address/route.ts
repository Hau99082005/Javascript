import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";
const AddNewAddress = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required()
})

export const dynamic = 'force-dynamic';


export async function POST(req) {
    try {
     await connectDB();
     const isAuthUser = await AuthUser(req);
     if(isAuthUser) {
         const data = await req.json();
         const {name, address, city, country, postalCode, userID} = data;
         const {error} = AddNewAddress.validate({
            name, address, city, country, postalCode, userID
         })
         if(error) {
            return NextResponse.json({
                success: false,
                massage: error.details[0].message,
            });
         }

         const newlyAddedAddress = await Address.create(data);
         if(newlyAddedAddress) {
            return NextResponse.json({
                success: true,
                message: "Đã thêm địa chỉ thành công!",
            });
         } else {
            return NextResponse.json({
                success: false,
                message: "Thêm một địa chỉ thất bại! Vui lòng thử lại",
            });
         }
     }else {
        return NextResponse.json({
            success: false,
            message: "Bạn chưa được chứng thực",
        })
     }

    }catch(e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Đã có lỗi xảy ra! vui lòng thử lại",
        })
    }
}