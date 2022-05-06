require("dotenv").config();
const fullData = require("./");

const { Pool } = require("pg");

const client = new Pool({
	connectionString: process.env.PG_URL,
});

(async () => {
	try {
		client.connect();

		const tables = Object.keys(fullData).map((key) => key);
		await client.query(
			`TRUNCATE ${tables.join(", ")} RESTART IDENTITY cascade`
		);
		for (const table of tables) {
			console.log(table);
			let count = 0;
			for (const elem of fullData[table]) {
				const keysArray = Object.keys(elem).map((key) => key);
				const keys = keysArray.join(", ");
				const values = keysArray
					.map((element, ind) => `$${ind + 1}`)
					.join(", ");
				const data = Object.keys(elem).map((key) => elem[key]);
				const results = await client.query(
					`insert into "${table}" (${keys}) values (${values})`,
					data
				);
				count += 1;
				console.log(results.command + " " + count);
			}
		}
		client.end();
	} catch (err) {
		if (err.code === "42P01") {
			console.log(`Query error, undefined table!, ${err.message}`);
		} else {
			console.log(err.message);
		}
	}
})();
