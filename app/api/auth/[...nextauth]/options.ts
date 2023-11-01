import axios from 'axios'; // Import Axios for HTTP requests
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'your-cool-username',
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'your-awesome-password',
                },
            },
            async authorize(credentials) {
                try {
                    // Make an HTTP request to your server to fetch user data
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_AUTHENTICATE || "", {
                        email: credentials!.email,
                        password: credentials!.password,
                    });

                    // Check if the response contains user data
                    const user = response.data;
                    if (user) {
                        // Include accessToken and refreshToken in the token object
                        return {
                            ...user,
                            token: user.token,
                        };
                    } else {
                        return "null";
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {       
        // Include accessToken and refreshToken in the token object
        async jwt({ token, user }) {
            if (user) {
                token.employeeId = user.employeeId;
                token.fullName = user.fullName;
                token.citizenId = user.citizenId;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.image = user.image;
                token.areaId = user.areaId;
                token.id = user.id;
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        // If you want to use the role, accessToken, and refreshToken in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user.fullName = token.fullName;
                session.user.citizenId = token.citizenId;
                session.user.email = token.email;
                session.user.phoneNumber = token.phoneNumber;
                session.user.image = token.image;
                session.user.areaId = token.areaId;
                session.user.employeeId = token.employeeId;
                session.user.role = token.role;
                session.user.token = token.token;
            }
            return session;
        },

    },
    pages:{
        signIn:'/',  
        error: "Username or Password is incorrect"     
    },
    session:{
        maxAge: 60 * 60 * 24, 
        
    }
};
