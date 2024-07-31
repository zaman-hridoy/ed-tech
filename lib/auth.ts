import axios from "@/lib/instance";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      sub: string;
      accessToken: string;
      userId: number;
      type: "Student" | "Educator" | "ContentManager";
      isVerified: boolean;
      iat: number;
      exp: number;
      jti: string;
    };
    expires: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@ed.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post("/auth/users/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data && res.data?.success) {
            return {
              token: res.data?.jwttoken,
              ...res.data?.user,
            };
          }
          return null;
        } catch (error: any) {
          console.log(error);
          throw Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // console.log("session", { session, user, token });
      session.user = {
        name: token.name as string,
        email: token.email as string,
        sub: token.sub as string,
        accessToken: token.accessToken as string,
        userId: token.userId as number,
        type: token.type as "Student" | "Educator" | "ContentManager",
        isVerified: token.isVerified as boolean,
        iat: token.iat as number,
        exp: token.exp as number,
        jti: token.jti as string,
      };
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });
      const loggedInUser = user as UserWithExtraData;
      try {
        const res = await axios.get("/content/getUserMyProfileDetail", {
          headers: {
            Authorization: loggedInUser.token,
          },
        });
        if (res.data && res.data?.success) {
          const user = res.data?.user;

          const profile = {
            role: res.data?.role,
            id: user.id,
            userId: user.userId,
            email: user?.email?.email,
            name: user.name + " " + user.last_name,
            firstName: user?.name || "",
            lastName: user?.last_name || "",
            about: user.about || "",
            country: user.country || "",
            state: user.state || "",
            address: user.address || "",
            image: user.image || "",
            university: user.university || "",
            subscribed: user.subscribed || "",
            designation: user.designation || "",
            birthdate: user.birthdate || "",
            gender: user.gender || "",
            phone_number: user.phone_number || "",
            allowed: user.allowed,
            isVerified: user.isVerified,
          };
          // update chat profile
          const chatProfile = await db.profile.findUnique({
            where: {
              userId: profile.userId,
            },
          });

          if (!chatProfile) {
            await db.profile.create({
              data: {
                userId: profile.userId,
                name: profile.name,
                imageUrl: profile.image,
                email: `${loggedInUser.email}`,
                role: profile.role,
                isActive: true,
              },
            });
          }

          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const loggedInUser = user as UserWithExtraData;
      // console.log("jwt", { token, user, account, profile, isNewUser });
      if (account) {
        token.name = loggedInUser?.username;
        token.email = loggedInUser?.email;
        token.accessToken = loggedInUser?.token;
        token.userId = loggedInUser?.id;
        token.type = loggedInUser?.type;
        token.isVerified = loggedInUser?.isVerified;
      }
      return token;
    },
  },
};

type UserWithExtraData = User & {
  username: string;
  token: string;
  id: number;
  type: string;
  isVerified: boolean;
};
