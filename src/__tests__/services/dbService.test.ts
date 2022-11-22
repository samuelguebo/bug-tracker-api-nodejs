import { Request } from "express"
import { DataSource } from "typeorm"

import { verifyUserAuthorization } from "../../services/authService"
import { AppDataSource } from "../../services/dbService"

describe('Database configuration', () => {

    it('Driver should be SQLite when in Test', async () => {
        expect(AppDataSource.options.type).toBe("sqlite")
    })

})