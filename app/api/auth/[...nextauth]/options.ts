import { getServerSession, type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GithubProfile } from 'next-auth/providers/github';
import axios from 'axios'; // Import Axios for HTTP requests
import { getSession } from 'next-auth/react';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    role: profile.role ?? 'user',
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    accessToken: '', // Add the actual access token here
                    refreshToken: '', // Add the actual refresh token here
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
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
                        return null;
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
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        // If you want to use the role, accessToken, and refreshToken in client components
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            const session = await getServerSession(options);
            
            console.log('url', url);
            console.log('baseUrl', baseUrl);

            return url.startsWith(baseUrl) ? url : `${baseUrl}/${session?.user?.role}`;
        }
    },
};
