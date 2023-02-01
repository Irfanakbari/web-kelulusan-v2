import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";
import {error401, error405, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import {Sequelize} from "sequelize";
import User from "@/models/User";
export default async function handler(req,res) {
    switch (req.method){
        case 'DELETE':
            try {
                const { id } = req.query

                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students
                await User.destroy({
                    where:{
                        username : id
                    },
                })
                // send response
                res.status(200).json({
                    status:200,
                    message: "Deleted Success"
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        case 'GET':
            try {
                const { id } = req.query

                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                // count total students
                const students = await Student.findAll({
                    where: {
                        [Sequelize.Op.or]: [
                            { nisn: id },
                            { nisn: { [Sequelize.Op.like]: `%${id}%` } }
                        ]
                    },
                    limit: 10
                });
                // send response
                res.status(200).json({
                    status:200,
                    data : students
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}