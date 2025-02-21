import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authClient } from "@/libs/api/services/auth";
import logger from "@/libs/logger";

const EXP_TIME = 60 * 60 * 24; // 1 day
const EXP_TIME_REMEMBER = 60 * 60 * 24 * 7; // 7 days for "remember me"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
        rememberMe: { type: "boolean", label: "Remember me" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password, rememberMe } = credentials;

        logger.info(`Login attempt for ${email}`);

        const { response, data, error } = await authClient.POST("/auth/login/", {
          body: {
            email: email,
            password: password,
          }
        });

        if (response.ok && data) {
          logger.info(`Login success for ${email}`);

          const accessTokenExpires =
            Date.now() +
            (rememberMe === "true"
              ? EXP_TIME_REMEMBER
              : EXP_TIME
            ) * 1000;

          return {
            id: email,
            access_token: data.access_token,
            refresh_token: rememberMe === "true" ? data.refresh_token : "",
            token_type: data.token_type,
            name: "",
            email: email,
            rememberMe: rememberMe === "true" ? true : false,
            access_token_expires: accessTokenExpires,
          };
        }

        if (response.status === 401) {
          logger.info(`Invalid credentials for ${email}`);

          throw new Error("Invalid credentials");
        }

        logger.error(`Login failed for ${email}`);
        logger.error(`Login Service Error: ${error}`);
        logger.error(`Login response: ${response}`);

        throw new Error("An error occurred");
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: EXP_TIME_REMEMBER,
  },
  jwt: {
    maxAge: EXP_TIME_REMEMBER
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.token_type = user.token_type;
        token.access_token_expires = user.access_token_expires;
        token.rememberMe = user.rememberMe;
      }

      if (Date.now() > token.access_token_expires) {
        if (
          token.rememberMe &&
          token.refresh_token
        ) {
          try {
            const { response, data } = await authClient.POST("/auth/refresh/", {
              params: {
                header: {
                  "refresh-token": token.refresh_token,
                },
              },
            });


            if (response.status === 200 && data) {
              console.log('data', data)
              token.access_token = data.access_token;
              token.refresh_token = data.refresh_token;
              token.token_type = data.token_type;
              token.access_token_expires =
                Date.now() +
                (token.rememberMe ? EXP_TIME_REMEMBER : EXP_TIME) * 1000;
            }
          } catch {
            return token;
          }
        }

        return null as never;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token) {
        return session;
      }
      session.user.access_token = token.access_token;
      session.user.refresh_token = token.refresh_token;
      session.user.token_type = token.token_type;
      session.user.rememberMe = token.rememberMe;
      session.user.access_token_expires = token.access_token_expires;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};
