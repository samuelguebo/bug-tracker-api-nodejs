import utils from '../src/utils/utils'

test('hash password', async () => {
    let plaintextPassword = "lorem"
    const hash = await utils.hashPassword(plaintextPassword)
    
    expect(hash).not.toBe(plaintextPassword)
});

test('compare hashed password', async () => {
    let goodPassword = "lorem"
    let wrongPassword = "money"
    const hash = await utils.hashPassword(goodPassword)
    const isEqual = await utils.compareHash(wrongPassword, hash)
    expect(isEqual).toBe(false)
});