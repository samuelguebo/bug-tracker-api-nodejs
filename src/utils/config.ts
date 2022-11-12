import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server_port:process.env.SERVER_PORT,
  dialect: process.env.DB_DIALECT,
  supersecret: process.env.AUTH_SECRET
};

export default config;
