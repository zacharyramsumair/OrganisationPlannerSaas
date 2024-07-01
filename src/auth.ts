import NextAuth, { CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import connectMongoDB from "./lib/db";
import connectMongoDB from "./lib/mongodb";
import { redirect } from "next/navigation";
import { User } from "./models/user";
// import { compare } from "bcryptjs";



export const runtime =  'nodejs'



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
   

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectMongoDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
              await User.create({ email, name, image, authProviderId: id, role:"user" });
              return true;
            } else {
              return true;

          }
        } catch (error:any) {
            console.log(error.message)
          throw new Error("Error while creating user");
        }
      }

    //   if (account?.provider === "credentials") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    },
  },
});