import { type NextAuthOptions } from "next-auth"

// 🔒 Auth configuration for the application
export const authOptions: NextAuthOptions = {
  providers: [
    // TODO: 🔄 Add OAuth providers
    // - [ ] Email/Password (Supabase)
    // - [ ] Google
    // - [ ] GitHub
  ],
  pages: {
    signIn: '/auth/signin',
    // TODO: 📝 Add custom pages
    // - [ ] signOut
    // - [ ] error
    // - [ ] verifyRequest
  },
  session: {
    strategy: 'jwt',
    // TODO: ⚙️ Configure session settings
    // - [ ] maxAge
    // - [ ] updateAge
  },
  callbacks: {
    // TODO: 🎯 Implement auth callbacks
    // - [ ] jwt
    // - [ ] session
    // - [ ] signIn
  },
  // TODO: 🔐 Add security configurations
  // - [ ] Configure CSRF protection
  // - [ ] Set cookie options
  // - [ ] Add event handlers
} 