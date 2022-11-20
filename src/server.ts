import app from "./app"
import { initializeDatabase } from "./services/dbService";

// Initiate Database connection
(async () => {
    await initializeDatabase()
    app.listen(process.env.SERVER_PORT, function () {
        console.log("The app is running on port " + process.env.SERVER_PORT)
    })

})()

