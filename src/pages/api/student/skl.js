import {error404, error500} from "@/utility/errorhandler";
import Student from "@/models/Student";
import Profile from "@/models/Profile";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import stream from "stream";
import {getCookie} from "cookies-next";
import {decodeToken} from "@/utility/token";


const content = fs.readFileSync(
    path.resolve("public/skl/skl.docx"),
    "binary"
);
const zip = new PizZip(content);


export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                // Verify JWT token
                const token = getCookie('token-key',{ req, res });
                const {nisn} = decodeToken(token);

                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });
                const profile = await Profile.findByPk(1)
                const datas = await Student.findOne({
                    where:{
                        nisn : nisn
                    }
                },{
                    attributes: {
                        exclude: ['isOpen','openDate']
                    }
                })
                if (!datas || !profile) return error404(res)
                doc.render({
                    name: datas.name,
                    nisn: datas.nisn,
                    jurusan: datas.jurusan,
                    sekolah: profile.nama_sekolah,
                    kepsek:profile.kepsek
                });
                const buf = doc.getZip().generate({
                    type: "nodebuffer",
                    // compression: DEFLATE adds a compression step.
                    // For a 50MB output document, expect 500ms additional CPU time
                    compression: "DEFLATE",
                });

                // fs.writeFileSync(path.resolve( `public/skl/${datas.nisn}-skl.docx`), buf);
                const bufferStream = new stream.PassThrough();

                bufferStream.end(buf);
                const filename = `${nisn}-skl.docx`
                res.setHeader(
                    'Content-Disposition',
                    `attachment; filename=${filename}`
                );
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                bufferStream.pipe(res);
            } catch (e){
                return error500(res,e.message)
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
