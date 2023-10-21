import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            employeeId: string
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
        employeeId: string
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
        employeeId: string
        fullName: string
        citizenId: string
        email: string
        phoneNumber: string
        image: string
        role: string
        token: string
    }
}