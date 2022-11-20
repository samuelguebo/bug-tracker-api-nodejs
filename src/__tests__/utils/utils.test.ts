import { describe, expect, test } from '@jest/globals'
import utils from '../../services/passwordService'
describe('password hashing', () => {
    test('hash password', async () => {
        let plaintextPassword = "lorem"
        const hash = await utils.hashPassword(plaintextPassword)

        expect(hash).not.toBe(plaintextPassword)
    })

    test('compare hashed password', async () => {
        let goodPassword: string = "lorem"
        let wrongPassword: string = "money"
        const hash = await utils.hashPassword(goodPassword)
        const isEqual = await utils.compareHash(wrongPassword, hash)
        expect(isEqual).toBe(false)
    })
})