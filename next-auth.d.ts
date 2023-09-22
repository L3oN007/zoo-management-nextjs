import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            username: string
            role: string
            accessToken: string
            refreshToken: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string
        accessToken: string
        refreshToken: string

    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string
        accessToken: string
        refreshToken: string
    }
}