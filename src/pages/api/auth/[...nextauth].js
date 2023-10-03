//* Next-Auth
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//* Utility Functions
import { mongoConnect } from "@/utils/functions";
import { PinterestUser } from "@/utils/models/user";

export const authOptions = {};

export default nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        //* connection to DB
        await mongoConnect();

        const existingUser = await PinterestUser.findOne({
          email: user?.email,
        });

        if (!existingUser) {
          await PinterestUser.create({
            name: user.name,
            email: user.email,
            avatarUrl: user.image,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const user = await PinterestUser.findOne({ email: session.user.email });
      const newSession = {
        ...session.user,
        id: user?._id,
        role: user?.role,
      };

      return newSession;
    },
  },
});
