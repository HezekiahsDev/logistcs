import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

interface CustomUser {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  role: string;
  accessTokenExpires: number;
}

// Helper to refresh token
async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.warn("Refresh token endpoint not implemented yet");
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/refresh/`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         refresh: token.refreshToken,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   if (!response.ok) {
  //     throw new Error("Failed to refresh token");
  //   }
  //   return {
  //     ...token,
  //     accessToken: data.access,
  //     accessTokenExpires: Date.now() + data.expires_in * 1000,
  //   };
  // } catch (error) {
  //   console.error("Refresh token error:", error);
  //   return {
  //     ...token,
  //     error: "RefreshAccessTokenError",
  //   };
  // }
  return {
    ...token,
    error: "RefreshAccessTokenNotImplemented",
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/login/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Invalid login credentials");
          }

          const data = await response.json();

          const user: CustomUser = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            role: data.user.role,
            accessToken: data.access,
            refreshToken: data.refresh,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
          };

          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Login error:", error);
            throw new Error(
              error.message || "Something went wrong during login"
            );
          }

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: CustomUser;
    }): Promise<JWT> {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          id: user.id,
          username: user.username,
          role: user.role,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      session.user = {
        id: token.id as string,
        email: session.user?.email || "",
        username: token.username as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        accessTokenExpires: token.accessTokenExpires as number,
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Optional: custom login page
  },
  secret: process.env.AUTH_SECRET,
});
