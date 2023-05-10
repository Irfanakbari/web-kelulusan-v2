import {decodeToken} from "@/utility/token";
import {error401, error405, error500} from "@/utility/errorhandler";
import {getCookie} from "cookies-next";
import User from "@/models/User";
import {hashPassword} from "@/utility/hash";

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
                const users = await User.findAll()

                const formattedUsers = users.map(user => {
                    const date = new Date(user.dataValues.createdAt);
                    return {
                        ...user.dataValues,
                        createdAt: date.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })
                    };
                });

                // send response
                res.status(200).json({
                    status:200,
                    data:formattedUsers
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        case 'POST':

            try {
                const data = {
                    username : req.body.username,
                    name : req.body.name,
                    password : hashPassword(req.body.password),
                    role: 'admin'
                }
                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students
                const users = await User.create(data)
                // send response
                res.status(200).json({
                    status:200,
                    data:users.dataValues
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}