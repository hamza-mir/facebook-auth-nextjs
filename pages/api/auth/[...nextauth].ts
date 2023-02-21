import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import GoogleProvider from 'next-auth/providers/google'
import facebookProvider from "next-auth/providers/facebook";


// import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        facebookProvider({
            clientId: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            type: "credentials",

            credentials: {
                // email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as any;

                if (email !== "john@gmail.com" || password !== "1234") {
                    throw new Error("invalid shit");
                }
                return {
                    id: "1234",
                    name: "poutsa",
                    email
                }
            }
        })
    ],


    pages: {
        signIn: "/si/sic",
        error: "/", //complete it later,
        signOut: "/" //complete it later
    }
}

export default NextAuth(authOptions)