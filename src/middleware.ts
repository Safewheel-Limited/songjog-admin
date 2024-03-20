import { NextRequest, NextResponse } from "next/server";
import { authKey } from "./common/constants";
import { tokenExpiresTime } from "./common/utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const token = request.cookies.get(authKey)?.value;
  //   if (tokenExpiresTime(token as string) > new Date()) {
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  //   if (token) {
  //     url.pathname = "/profile";
  //     return NextResponse.redirect(url);
  //   }
}
