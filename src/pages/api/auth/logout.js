import {error405} from "@/utility/errorhandler";
import {deleteCookie} from "cookies-next";

export default function handler(req,res) {
    switch (req.method) {
        case "GET":
            // Destroy the session token
            deleteCookie('token-key-adm',{req, res})

            // Send response
            res.status(200).json({
                status: 200,
                message: 'Success'
            })
            break
        default:
            return error405(res)
    }
}