import { authKey } from "../constants";
import { decodedToken, setToLocalStorage } from "../utils";
import Cookies from "universal-cookie";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const cookies = new Cookies();
  const authToken = cookies.get(authKey);

  if (authToken) {
    const decodeToken = decodedToken(authToken);
    return decodeToken;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const cookies = new Cookies();
  const authToken = cookies.get(authKey);
  return !!authToken;
};
