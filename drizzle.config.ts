import type { Config } from "drizzle-kit";
import { config } from "dotenv";
config()
 
export default {
  schema: "./src/db/schema.ts",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  }
} satisfies Config;
