// /middleware.ts
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req,res) => {
    const session = await getIronSession(req, res, {
        password: process.env.IRON,
        cookieName: "sessions",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    });

    // do anything with session here:
    const { user } = session;

    // like mutate user:
    // user.something = someOtherThing;
    // or:
    // session.user = someoneElse;

    // uncomment next line to commit changes:
    // await session.save();
    // or maybe you want to destroy session:
    // await session.destroy();


    // demo:
    if (user?.admin !== "true") {
        // unauthorized to see pages inside admin/
        return NextResponse.redirect(new URL('/admin/login', req.url)) // redirect to /unauthorized page
    }

    return res;
};

export const config = {
    matcher: "/admin",
};