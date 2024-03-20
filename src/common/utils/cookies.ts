import Cookies from "universal-cookie";
import { authKey } from "../constants";
import { tokenExpiresTime } from ".";

const cookies = new Cookies();
export const storeCookies = (token: string) => {
  cookies.set(authKey, token, {
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
  cookies.remove(authKey, {
    path: "/",
    domain: "localhost",
  });
};
