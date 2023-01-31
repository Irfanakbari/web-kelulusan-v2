import User from "@/models/User";
import {hashPassword} from "@/utility/hash";
import {signToken} from "@/utility/token";
import {error400, error404, error405, error500} from "@/utility/errorhandler";
import {setCookie} from "cookies-next";

export default async function handler(req,res){
    switch (req.method) {
        case 'POST':
            // Check if username and password not null
            if (!req.body.username || !req.body.password) return error400(res)

            // Find user
            try {
                const user = await User.findOne({
                    where: {
                        username: req.body.username,
                        password: hashPassword(req.body.password)
                    }
                },{
                    attributes: {
                        exclude: ['password','createdAt']
                    }
                })

                // Check if user is already
                if (!user) return error404(res)

                // Set cookie to save token
                setCookie('token-key-adm', signToken({
                    username: user.username,
                }), { req, res, maxAge: 60 * 60 * 24, httpOnly:true ,sameSite:true});

                // Send Response
                res.status(200).json(
                    {
                        status: 200,
                        message : "Login Berhasil"
                    }
                )
            } catch (e) {
                error500(res,e.message)
            }
            break
        default:
            return error405(res)
    }
}