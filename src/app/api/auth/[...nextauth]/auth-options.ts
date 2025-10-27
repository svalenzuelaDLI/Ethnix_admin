import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
// SERVICES
import { HttpService } from "@/services";
// TYPES
import { IModel_Users, IModel_Errorgateway } from "@/types";



export const authOptions: NextAuthOptions = {
  //debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, //15min//30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
        session = Object.assign({}, session)
        session.user.access_token=token;
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${parsedUrl.searchParams.get('callbackUrl')}`;
        //se elimino ${baseUrl} antes de ${parsedURL}
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        try {
          console.log("Entrando proceso authorize")
        const http = new HttpService();
        const userData={
          userName: credentials?.email,
          password: credentials?.password,
          includePermissions: false,
          includeRoles: true,
          includeUserFields: true
        }
        const response = await http.service().push<any,IModel_Users.ISignin>(`/Security/Login`,"", userData);
            console.log("Response:", response)

        if (response.succeeded) {
         response.data.token="--";
          return response.data as any;


        }else{
          console.log("Error al iniciar sesion: credenciales incorrectas")
          return null
        }
            } catch (err) {
        console.log(err)
          throw new Error('Next Auth - Authorize: Authentication error');
      }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
