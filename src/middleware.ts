import { NextResponse } from "next/server";

// export const config = {
//   matcher: ["/", "/blog"],
// };

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set headers to prevent caching
  response.headers.set("Cache-Control", "no-store");

  return response;
}
