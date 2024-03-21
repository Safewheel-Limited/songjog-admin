import { NextRequest, NextResponse } from "next/server";
import { authKey } from "./common/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const token = request.cookies.get(authKey)?.value;
}
