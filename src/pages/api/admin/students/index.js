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
                const limit = 10;
                const page = parseInt(req.query.page || 1, 10);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students and calculate pagination data
                const totalStudents = await Student.count();
                const totalPages = Math.ceil(totalStudents / limit);
                const offset = (page - 1) * limit;

                // count total students
                const students = await Student.findAll({
                    limit, offset
                })
                // send response
                res.status(200).json({
                    status:200,
                    data:students,
                    pagination: {
                        current: page,
                        max: totalPages,
                        total: totalStudents,
                    },
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}