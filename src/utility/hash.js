import saltedMd5 from 'salted-md5'

export function hashPassword(password) {
    return saltedMd5(password, 'SUPER-S@LT!');
}

export function checkPassword(encrypted,plain) {
    const password = saltedMd5(plain, 'SUPER-S@LT!');
    return encrypted === password;
}