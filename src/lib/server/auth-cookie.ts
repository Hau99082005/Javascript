import { cookies } from "next/headers";

type TokenData = {
  token: string;
  refreshToken: string;
};

export const setToken = async ({ token, refreshToken }: TokenData) => {
  const cookieStore = await cookies(); // ⬅ phải await
  cookieStore.set("token", token, { path: "/", httpOnly: true });
  cookieStore.set("refreshToken", refreshToken, { path: "/", httpOnly: true });
};
