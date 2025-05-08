import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  // @ts-ignore
  async function middleware(req) {
    // console.log("look at me", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    loginPage: "/api/auth/login",
    publicPaths: ["/"],
    // @ts-ignore
    isAuthorized: ({ token }) => {
      //   console.log("token", token);
      // The user will be considered authorized if they have the permission e.g'eat:chips'
      return token.permissions.includes("crud:task");
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
