// middleware.ts (at project root)
import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export default clerkMiddleware((auth, req) => {
  // run i18n after Clerk has attached auth context
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/", "/:locale(en|ar)", "/:locale(en|ar)/:path*"],
};

// // middleware.ts
// import createIntlMiddleware from 'next-intl/middleware';

// export default createIntlMiddleware({
//   locales: ['ar','en'],
//   defaultLocale: 'ar'
// });

// export const config = {
//   matcher: [
//     '/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)'
//   ]
// };
