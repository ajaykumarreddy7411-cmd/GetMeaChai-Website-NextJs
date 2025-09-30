import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import User from "@/models/User"
import connectDB from "@/db/connectDb"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "github") {
                await connectDB()

                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    await newUser.save()
                }
                return true
            }
            return false
        },

        async session({ session }) {
            await connectDB()
            const dbUser = await User.findOne({ email: session.user.email })
            if (dbUser) {
                session.user.name = dbUser.username
            }
            return session
        },
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
