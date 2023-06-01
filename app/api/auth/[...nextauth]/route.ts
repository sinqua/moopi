import NextAuth, { } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import TwitterProvider from "next-auth/providers/twitter"
import KakaoProvider from "next-auth/providers/kakao"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET as string
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,    
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  callbacks: {
    async session({ session, token, user } : {session: any, token: any, user: any}) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log("session", session);
      // console.log("token", token);
      // console.log("user", user);

      if(user) {
        session.user = user;
      }

      return session
    },
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }