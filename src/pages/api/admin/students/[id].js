import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";
import {error401, error405, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import {Sequelize} from "sequelize";
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
                await Student.destroy({
                    where:{
                        nisn : id
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
        case 'POST':
            try {
                const { id } = req.query

                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);

                // check if token is valid
                if (verify == null) return error401(res)

                const data = {
                    name : req.body.name,
                    email : req.body.email,
                    kelas : req.body.kelas,
                    jurusan : req.body.jurusan,
                    status : req.body.status,
                    tgl_lahir : req.body.tgl_lahir,
                    kabupaten : req.body.kabupaten,
                    provinsi : req.body.provinsi
                }

                // count total students
                await Student.update(data,{
                    where: {
                        nisn : id
                    }
                })
                // send response
                res.status(200).json({
                    status:200,
                    message : "Sukses"
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