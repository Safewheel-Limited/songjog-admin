import { JwtPayload, jwtDecode } from "jwt-decode";

export const decodedToken = (token: string): JwtPayload | undefined => {
  if (token) {
    return jwtDecode<JwtPayload>(token);
  }
};

export const tokenExpiresTime = (token: string): Date => {
  const decoded = decodedToken(token);
  const expiresTime = new Date((decoded?.exp as number) * 1000);
  return expiresTime;
};
