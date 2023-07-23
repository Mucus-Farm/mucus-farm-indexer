import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { config } from 'dotenv'
config()

const pool = new Pool({
  connectionString: process.env.DB_URL,
})
export const db: NodePgDatabase = drizzle(pool)
