/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDB from '@/database/data';
import { User } from '@/models/user';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // Lấy token từ header Authorization
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ message: 'Không tìm thấy token.' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] });
    } catch (err) {
      return NextResponse.json({ message: 'Token không hợp lệ.' }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'Không tìm thấy người dùng.' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error('Lỗi khi xác thực:', error);
    return NextResponse.json({ message: 'Lỗi xác thực hoặc token không hợp lệ.' }, { status: 401 });
  }
}
