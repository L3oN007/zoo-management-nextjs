import axios from 'axios'; // Import Axios for HTTP requests
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
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
                    const response = await axios.post('http://localhost:5500/auth/login', {
                        username: credentials!.username,
                        password: credentials!.password,
                    });

                    // Check if the response contains user data
                    const user = response.data;
                    if (user) {
                        // Include accessToken and refreshToken in the token object
                        return {
                            ...user,
                            accessToken: user.accessToken,
                            refreshToken: user.refreshToken,
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
                token.username = user.username;
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        // If you want to use the role, accessToken, and refreshToken in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user.username = token.username;
                session.user.role = token.role;
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
            }
            return session;
        },

    },
    pages:{
        signIn:'/',  
        error: "Username or Password is incorrect"     
    },
    session:{
        maxAge: 60 * 60 * 24 * 7, 
        
    }
};
