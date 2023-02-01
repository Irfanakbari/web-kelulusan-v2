import {error401, error405, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import multer from 'multer';
import sequelize from "sequelize"
import xlsx from 'xlsx';
import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";

const storage = multer.memoryStorage()
const upload = multer({storage: storage});


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

                upload.single('file')(req, res, async (error) => {
                    if (error) {
                        console.error(error);
                        res.status(500).end();
                    }

                    const {buffer} = req.file;
                    const workbook = xlsx.read(buffer, {type: 'buffer'});
                    const firstSheet = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheet];
                    const data = xlsx.utils.sheet_to_json(worksheet);

                    await Student.destroy({
                        where :{},
                        truncate: true
                    })
                    const convertedData = data.map(item => ({
                        ...item,
                        tgl_lahir: sequelize.fn('STR_TO_DATE', item.tgl_lahir, '%d%m%Y'),
                    }));
                    await Student.bulkCreate(convertedData)

                    // Do something with the file, e.g. save to disk, process
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