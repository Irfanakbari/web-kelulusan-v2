import {error401, error405, error500} from "@/utility/errorhandler";
import multer from 'multer';
import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
})

const upload = multer({ storage : storage})


export default async function handler(req,res) {
    switch (req.method){
        case 'POST':
            try {
                // get token
                const token = getCookie('token-key-adm',{ req, res });
                const verify = decodeToken(token);
                //
                // // check if token is valid
                if (verify == null) return error401(res)

                upload.single('logo')(req, res, async (error) => {
                    if (error) {
                        res.status(500).end();
                    }
                    console.log(req.file)
                });
                // send response
                res.status(200).json({
                    status:200,
                    message: "Import Success"
                })
            } catch (err) {
                error500(res,err.message)
            }
            break
        default:
            error405(res)
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
}