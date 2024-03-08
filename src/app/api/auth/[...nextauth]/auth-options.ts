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
      //console.log("callbal Session", session)
      //console.log("callback user", user)
      //console.log("callback token", token)
    
        session = Object.assign({}, session)
       // console.log(session);
        session.user.access_token=token;
      return session
      

      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.idToken as string,
      //   },
      // };
    },
    async jwt({ token, user }) {
      //console.log("jwt user", user)
      //console.log("jwt token", user)

      if (user) {
        // return user as JWT
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      //console.log("Redirect", url)
      //console.log("Redirect base", baseUrl)

      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
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
 // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid
        const http = new HttpService();

        console.log("ESTO NECESITO:" ,env.NODE_ENV)
        const userData={
          userName: credentials?.email,
          password: credentials?.password,
          includePermissions: false,
          includeRoles: true,
          includeUserFields: true
        }

       //console.log("user data:", userData)
        const response = await http.service().push<any,IModel_Users.ISignin>(`/Security/Login`,"", userData);
  
        if (response.succeeded) {
          console.log("entro")
         response.data.token="--";
          //response.data.idToken=response.data.token;
          return response.data as any;


        }else{
          console.log("NEL, error", response)
          return null
        }
      
         // throw new Error(message);
      } catch (err) {
        console.log(err)
          throw new Error('Next Auth - Authorize: Authentication error');
      }
       



        // console.log("Aqui")
        // const user = {
        //   email: 'admin@admin.com',
        //   password: 'admin',
        // };

        // if (
        //   isEqual(user, {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   })
        // ) {
        //   return user as any;
        // }
        // return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
