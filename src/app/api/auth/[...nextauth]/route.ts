import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getIp } from "@/lib/request";
import { rateLimit } from "@/lib/rateLimit";

const handler = NextAuth(authOptions);

const guardedHandler = async (req : Request, context: unknown) => {

    const url = new URL(req.url);

    const isOAuthSignIn = req.method === "POST" && (
        url.pathname.endsWith("/api/auth/signin/github") ||
        url.pathname.endsWith("/api/auth/signin/google")
    );

    if(isOAuthSignIn) {
        
        const ip = await getIp();

        const limits = {
            key: `rate:oauth-signin:${url.pathname}:${ip}`,
            limit: 20,
            windowSeconds: 60 * 10
        };

        const limit = await rateLimit(limits);

        if(!limit.success){
            return Response.json(
                {error: "Too many sign-in attempts. Please try again later."},
                {status: 429}
            );
        }

    }

    return handler(req, context);
}

export { guardedHandler as GET, guardedHandler as POST };
