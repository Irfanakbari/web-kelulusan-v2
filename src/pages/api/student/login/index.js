import {error400, error404, error405, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import {setCookie} from "cookies-next";
import {signToken} from "@/utility/token";

export default async function handler(req,res) {
    switch(req.method) {
        case 'POST':
            // Check if nisn and date not null
            if (!req.body.nisn || !req.body.date) return error400(res)
            try {
                const nisn = req.body.nisn;
                const birth = req.body.date;

                // Find student
                const student = await Student.findOne({
                    where:{
                        nisn : nisn,
                        tgl_lahir : birth
                    }
                },{
                    attributes: {
                        exclude: ['isOpen','openDate']
                    }
                })

                // check if student not null
                if (!student) return error404(res)

                // Set cookie to save token
                setCookie('token-key', signToken({
                    nisn: student.nisn,
                }), { req, res, maxAge: 60 * 60 * 24, httpOnly:true ,sameSite:true});

                // Send response
                res.status(200).json(
                    {
                        status: 200,
                        message: 'Login Berhasil'
                    }
                )
            } catch (e){
                return error500(res,e.message)
            }
            break
        default:
            return error405(res)
    }
}