import {error401, error404, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import {Sequelize} from "sequelize";
import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                // Verify JWT token
                const token = getCookie('token-key',{ req, res });
                const {nisn} = decodeToken(token);

                // Check if token is valid
                if (nisn == null) return error401(res)

                // find student
                const student = await Student.findOne({
                    where:{
                        nisn : nisn,
                    }
                },{
                    attributes: {
                        exclude: ['isOpen','openDate']
                    }
                })

                // If student not found
                if (!student) return error404(res)

                // Update student isOpen
                await Student.update({ openDate: Sequelize.fn('NOW'),isOpen:1 }, {
                    where: {
                        nisn: nisn
                    }
                });

                // Send response
                res.status(200).json(
                    {
                        status: 200,
                        data : student,
                    }
                )
            } catch (e){
                error500(res)
            }
            break
        default:
            res.status(405).json(
                {
                    status: 405,
                    message: 'Method Not Allowed'
                }
            )
    }
}
