import * as schema from "./schema/schema";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema });
