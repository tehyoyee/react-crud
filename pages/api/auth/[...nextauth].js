import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '504ea0f0faf882b2c0cd',
      clientSecret: '59992cb0f9b352857b19cdf9faeca4a050157e8c',
    }),
  ],
  secret : '1234qwer',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);