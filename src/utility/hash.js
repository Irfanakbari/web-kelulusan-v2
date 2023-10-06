import saltedMd5 from 'salted-md5'

export function hashPassword(password) {
    return saltedMd5(password, process.env.SALT);
}

export function checkPassword(encrypted,plain) {
    const password = saltedMd5(plain, process.env.SALT);
    return encrypted === password;
}