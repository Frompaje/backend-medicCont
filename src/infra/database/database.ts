import { Pool } from 'pg';

export const pg = new Pool({
  host: process.env.HOSTNAME,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});
