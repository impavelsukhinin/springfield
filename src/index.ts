import 'env'
import 'reflect-metadata'
import connection from 'db'
import * as Koa from 'koa'
import { Context } from 'koa'

const run = async () => {
	try {
		const app = new Koa()

		await connection()

		app.use(async (ctx: Context) => {
			ctx.body = 'Hello World'
		})

		app.listen(3000, () => {
			console.log('Server started!')
		})
	} catch (e) {
		console.error('Error on app initialization')
		console.error(e)
	}
}

run()
