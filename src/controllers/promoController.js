import client from "../database"

export const promoController = {
	async getArray(...args) {
		try {
			return (await client.query(...args)).rows
		} catch (err) {
			console.log(err.message)
			throw err
		}
	},

	async getRow(...args) {
		try {
			return (await this.getArray(...args))[0]
		} catch (err) {
			console.log(err.message)
			throw err
		}
	},

	async promosList(_, res) {
		try {
			const promos = await promoController.getArray("SELECT * FROM promo")
			res.render("promos", { promos })
		} catch (error) {
			console.log(error)
		}
	},

	async promoPage(req, res) {
		try {
			const promoId = await promoController.getRow(
				`SELECT * FROM promo WHERE id = $1`,
				[+req.params.id]
			)

			res.render("promo", {
				promoId: promoId,
			})
		} catch (error) {
			console.log(error)
		}
	},

	async studentsPage(req, res) {
		try {
			const promoId = await promoController.getRow(
				`SELECT * FROM promo WHERE id = $1`,
				[+req.params.id]
			)
			const promo = await promoController.getArray(
				`SELECT * FROM student WHERE promo_id = $1`,
				[+req.params.id]
			)
			res.render("students", {
				promoId: promoId,
				promo: promo,
			})
		} catch (error) {
			console.log(error)
		}
	},

	async studentPage(req, res) {
		try {
			const promoId = await promoController.getRow(
				`SELECT * FROM promo WHERE id = $1`,
				[+req.params.id]
			)
			const student = await promoController.getRow(
				`SELECT * FROM student WHERE id = $1`,
				[+req.params.student]
			)
			res.render("student", {
				promoId: promoId,
				student: student,
			})
		} catch (error) {
			console.log(error)
		}
	},
}
