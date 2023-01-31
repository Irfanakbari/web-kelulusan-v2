import jwt from 'jsonwebtoken'

export function signToken(data){
    try {
        return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '12h' });
    } catch (err) {
        return err.message
    }
}

export function decodeToken(token){
    try {
        return jwt.decode(token, process.env.SECRET_KEY)
    } catch (e) {
        return e.message;
    }
}