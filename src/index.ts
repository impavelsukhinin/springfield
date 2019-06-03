import 'reflect-metadata'
import 'env'
import 'auth'
import connection from 'db'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as passport from 'koa-passport'
import * as bodyParser from 'koa-bodyparser'
import routes from 'routes'

const run = async () => {
	try {
		const port = process.env.PORT ? Number(process.env.PORT) : 3000
		const app = new Koa()

		await connection()

		app.use(bodyParser())
		app.use(passport.initialize())
		app.use(routes.routes()).use(routes.allowedMethods())

		app.use(logger())

		app.listen(port, () => {
			console.log(`Server started on ${port} port in ${process.env.NODE_ENV} mode`)
		})
	} catch (e) {
		console.error('Error on app initialization')
		console.error(e)
	}
}

run()
