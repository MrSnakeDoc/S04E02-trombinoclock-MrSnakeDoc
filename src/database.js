import { config } from "./config"
import { Pool } from "pg"

export default new Pool({
	connectionString: config.pg_url,
})
