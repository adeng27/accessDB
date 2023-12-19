// import { authMiddleware } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
 
// export default withClerkMiddleware((req: NextRequest) => {
//   return NextResponse.next();
// });
 
// // Stop Middleware running on static files
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next
//      * - static (static files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     "/((?!static|.*\\..*|_next|favicon.ico).*)",
//     "/",
//   ],
// }
 
export default authMiddleware({
  publicRoutes: ["/"],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};