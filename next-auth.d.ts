import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            fullName: string
            citizenId: string
            email: string
            phoneNumber: string
            image: string
            role: string
            token: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        fullName: string
        citizenId: string
        email: string
        phoneNumber: string
        image: string
        role: string
        token: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        fullName: string
        citizenId: string
        email: string
        phoneNumber: string
        image: string
        role: string
        token: string
    }
}