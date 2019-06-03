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
		const app = new Koa()

		await connection()

		app.use(bodyParser())
		app.use(passport.initialize())
		app.use(routes.routes()).use(routes.allowedMethods())

		app.use(logger())

		app.listen(3000, () => {
			console.log(`Server started in ${process.env.NODE_ENV} mode`)
		})
	} catch (e) {
		console.error('Error on app initialization')
		console.error(e)
	}
}

run()
