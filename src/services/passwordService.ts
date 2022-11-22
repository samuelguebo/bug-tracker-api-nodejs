import bcryptjs from 'bcryptjs'
const { genSaltSync, hash: _hash, compare } = bcryptjs
const utils = {
    hashPassword: function (plaintextPassword: string) {
        const salt = genSaltSync(10)
        return _hash(plaintextPassword, salt)
    },
    compareHash: function (plaintextPassword: string, hash: string) {
        return compare(plaintextPassword, hash)
    }
}

export default utils