//SESSION
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/auth-options"; // ⚠️ Make sure this is the correct path

export const getSession = async () => {
    const session = await getServerSession(authOptions);
  

  if (session) {
    // prints on the server
    console.log('this is happening on the server');
    console.log(JSON.stringify(  session))

    const sessionData =ON.stringify(session);

    return sessionData;
  }
}