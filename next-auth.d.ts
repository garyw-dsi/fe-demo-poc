/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      access_token: string,
      refresh_token: string,
      token_type: string,
      access_token_expires: number,
      rememberMe: boolean,
    }
  }

  interface User {
    access_token: string,
    refresh_token: string,
    token_type: string,
    access_token_expires: number,
    rememberMe: boolean,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string,
    refresh_token: string,
    token_type: string,
    access_token_expires: number,
    rememberMe: boolean,
  }
}