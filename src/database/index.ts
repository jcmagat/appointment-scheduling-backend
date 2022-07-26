import pg, { PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const devConfig: PoolConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
};

// Set up for heroku pg
const prodConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

const pool = new pg.Pool(config);

export default pool;
