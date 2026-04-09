import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        try {
          // Sync with our FastAPI backend
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://gamifycode-api.onrender.com"}/api/v1/auth/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "github",
              provider_id: user.id,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Store our own JWT in the user object for session use
            user.accessToken = data.access_token;
            return true;
          }
        } catch (error) {
          console.error("Error syncing user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
