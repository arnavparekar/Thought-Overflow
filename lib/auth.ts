import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { SupabaseAdapter } from '@auth/supabase-adapter'
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    session: async ({ session, token }) => {
      return session
    },
  },
}