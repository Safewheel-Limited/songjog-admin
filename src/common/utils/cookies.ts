import Cookies from "universal-cookie";
import { authKey, refreshToken } from "../constants";
import { tokenExpiresTime } from ".";

const cookies = new Cookies();
export const storeCookies = (cookieName: string, token: string) => {
  cookies.set(cookieName, token, {
    expires: tokenExpiresTime(token),
  });
};

export const getCookies = (name = authKey) => {
  const getCookie = cookies.get(name);
  return getCookie;
};

export const removeCookies = (token: string) => {
  if (tokenExpiresTime(token as string) > new Date()) {
    cookies.remove(authKey, { path: "/", domain: "localhost" });
  }
};

export const userLogout = () => {
  const cookieOptions = {
    path: "/",
    domain: "localhost",
  };
  cookies.remove(authKey, cookieOptions);
  cookies.remove(refreshToken, cookieOptions);
};
