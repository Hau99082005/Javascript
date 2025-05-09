import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import envConfig from '../../../../config';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: envConfig.NEXT_PUBLIC_USER,
      password: envConfig.NEXT_PUBLIC_PASSWORD,
      database: envConfig.NEXT_PUBLIC_DATABASE,
    });

    await connection.ping();
    await connection.end();

    return NextResponse.json({ success: true, message: 'Kết nối MySQL thành công' });
  } catch (error) {
    console.error('Lỗi khi kết nối MySQL:', error);
    return NextResponse.json({ success: false, message: 'Kết nối MySQL thất bại' }, { status: 500 });
  }
}
