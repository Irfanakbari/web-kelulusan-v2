// /middleware.ts
import { NextResponse } from "next/server";
import {getCookie} from "cookies-next";

export const middleware = async (req,res) => {

    // do anything with session here:
    const token = getCookie('token-key-adm',{ req, res });
    // like mutate user:
    // user.something = someOtherThing;
    // or:
    // session.user = someoneElse;

    // uncomment next line to commit changes:
    // await session.save();
    // or maybe you want to destroy session:
    // await session.destroy();


    // demo:
    if (!token) {
        // unauthorized to see pages inside admin/
        return NextResponse.redirect(new URL('/admin/login', req.url)) // redirect to /unauthorized page
    }

    return res;
};

export const config = {
    matcher: "/admin",
};