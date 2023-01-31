
export function error404(res){
    res.status(404).json(
        {
            status: 404,
            message: 'User Not Found'
        }
    )
}

export function error400(res){
    res.status(400).json({
        status: 400,
        message: 'Bad Request'
    })
}

export function error401(res){
    res.status(401).json(
        {
            status: 401,
            message: 'Token Expired or Wrong'
        }
    )
}

export function error405(res){
    res.status(405).json(
        {
            status: 405,
            message: 'Method Not Allowed'
        }
    )
}

export function error500(res,message){
    res.status(500).json(
        {
            status: 500,
            message: message
        }
    )
}