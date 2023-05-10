import {error401, error405, error500} from "@/utility/errorhandler";
import multer from 'multer';
import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";
import path from "path";


const upload = multer({
    storage: multer.diskStorage({
        destination: './public/img',
        filename: (req, file, cb) => cb(null, "main-logo" + path.extname(file.originalname)),
    }),
});

// const upload2 = multer({
//     storage: multer.diskStorage({
//         destination: './public/skl',
//         filename: (req, file, cb) => cb(null, "skl" + path.extname(file.originalname)),
//     }),
// });


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

                await upload.any('logo')(req, res, async (error) => {
                    if (error) {
                        res.status(500).end();
                    }
                });

                await upload.any('skl')(req, res, async (error) => {
                    if (error) {
                        res.status(500).end();
                    }
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