import {decodeToken} from "@/utility/token";
import {error401, error405, error500} from "@/utility/errorhandler";
import {getCookie} from "cookies-next";
import Profile from "@/models/Profile";

export default async function handler(req,res){
    switch (req.method) {
        case 'GET':
            try {
                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students
                const settings = await Profile.findAll()
                // send response
                res.status(200).json({
                    status:200,
                    data: settings
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        case 'POST':
            try {
                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students
                const settings = await Profile.update(req.body, {
                    where: {
                        id: 1
                    }
                });
                // send response
                res.status(200).json({
                    status:200,
                    message : "Sukses"
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}