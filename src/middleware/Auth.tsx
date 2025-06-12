import jwt, { JwtPayload } from "jsonwebtoken";
import { auth } from "@/firebase/server";

export const dynamic =  "force-dynamic";

interface FirebaseTokenPayload extends JwtPayload {
    firebase?: {
        identities: {
            [key: string]: string[];
        };
        sign_in_provider: string;
    };
}

const AuthUser = async(req) =>{
    // Lấy cookie từ request
    const cookie = req.headers.get('cookie');
    let token = null;
    if (cookie) {
        // Tìm token trong cookie
        const match = cookie.match(/token=([^;]+)/);
        if (match) token = match[1];
    }

    console.log('Cookie:', cookie);
    console.log('Extracted token:', token);

    if (!token) return false;

    try {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        // First try to decode the token to check its algorithm
        const decoded = jwt.decode(token) as FirebaseTokenPayload;
        console.log('Decoded token header:', decoded);

        // If it's a Firebase token (has firebase field in payload), use Firebase Admin SDK
        if (decoded && decoded.firebase) {
            try {
                const decodedToken = await auth.verifyIdToken(token);
                console.log('Decoded Firebase token:', decodedToken);
                return decodedToken;
            } catch (error) {
                console.log('Firebase token verification error:', error);
                return false;
            }
        } else {
            // For our custom tokens, use HS256
            const extractAuthUser = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key", { algorithms: ['HS256'] });
            console.log('Decoded custom token:', extractAuthUser);
            if(extractAuthUser) return extractAuthUser;
        }
    }catch(e) {
        console.log('JWT verification error:', e);
        return false;
    }
}

export default AuthUser;