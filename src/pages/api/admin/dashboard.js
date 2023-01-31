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
                const total = await Student.findAndCountAll()
                // count total students lulus
                const lulus = await Student.findAndCountAll({
                    where:{
                        status : 1
                    }
                })
                // count total students open
                const opened = await Student.findAndCountAll({
                    where:{
                        isOpen : 1
                    }
                })
                // count total students tidak lulus
                const tidaklulus = await Student.findAndCountAll({
                    where:{
                        status : 0
                    }
                })
                // history student view
                const listsiswa = await Student.findAll({
                    order: [
                        ['openDate', 'DESC']
                    ],
                    limit: 10
                })

                const formattedStudents = listsiswa.map(student => {
                    const date = new Date(student.dataValues.openDate);
                    return {
                        ...student.dataValues,
                        openDate: date.toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    };
                });


                // send response
                res.status(200).json({
                    status:200,
                    data:{
                        lulus:lulus.count,
                        total:total.count,
                        tidaklulus:tidaklulus.count,
                        dibuka:opened.count,
                        listsiswa: formattedStudents
                    }
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            return error405(res)
    }
}