import express from "express"
import ejs from "ejs"
import { config } from "./config/"
import client from "./database"
import { router } from "./router"
const app = express(express.urlencoded({ extended: true }))

app.use(router)
app.set("views", "./src/views")
app.set("view engine", "ejs")

try {
	client.connect()
	console.log("Connected to Postgres!")
} catch (error) {
	console.log(`Something went wrong ${error}`)
}

app.listen(config.port, async () => {
	console.log(`Server is running on http://${config.host}:${config.port}`)
})
