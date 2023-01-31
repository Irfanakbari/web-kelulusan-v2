import Profile from "@/models/Profile";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const datas = await Profile.findByPk(1)
            res.status(200).json(
                {
                    status: 200,
                    data: datas
                }
            )
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