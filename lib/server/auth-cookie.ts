"use server";

import { cookies } from "next/headers";
import { auth } from "@/firebase/server";

export const removeToken = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete("firebaseAuthToken");
  (await cookieStore).delete("firebaseAuthRefreshToken");
};

export const setToken = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) return;

    const userRecord = await auth.getUser(verifiedToken.uid);
    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      await auth.setCustomUserClaims(verifiedToken.uid, { admin: true });
    }

    const cookieStore = cookies();
    (await cookieStore).set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    (await cookieStore).set("firebaseAuthRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (e) {
    console.error(e);
  }
};
