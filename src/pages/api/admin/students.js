import {decodeToken} from "@/utility/token";
import Student from "@/models/Student";
import {error401, error405, error500} from "@/utility/errorhandler";
import {getCookie} from "cookies-next";

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
                const students = await Student.findAll({
                    limit:10
                })
                // send response
                res.status(200).json({
                    status:200,
                    data:students,
                    next: (students.length >= 10)
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}