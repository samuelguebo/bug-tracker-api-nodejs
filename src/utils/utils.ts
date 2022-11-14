import moment from 'moment'
import bcryptjs from 'bcryptjs'
const { genSaltSync, hash: _hash, compare } = bcryptjs
const utils = {
    loremIpsumGenerator:
        function () {

            // Default text. TODO: switch to an array

            let text = "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet."

            return text
        },
    currentDate:
        function () {
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            return date
        },
    hashPassword: function (plaintextPassword: string) {
        const salt = genSaltSync(10)
        return _hash(plaintextPassword, salt)
    },
    compareHash: function (plaintextPassword: string, hash: string) {
        return compare(plaintextPassword, hash)
    }
}
export default utils