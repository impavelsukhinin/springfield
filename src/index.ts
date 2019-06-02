import 'env'
import 'reflect-metadata'
import connection from 'db'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as passport from 'koa-passport'
import { adminRouter } from 'routes'

// import 'strategies'

const run = async () => {
	try {
		const app = new Koa()

		await connection()

		app.use(adminRouter.routes()).use(adminRouter.allowedMethods())

		app.use(logger)
		app.use(passport.initialize())

		app.listen(3000, () => {
			console.log(`Server started in ${process.env.NODE_ENV} mode`)
		})
	} catch (e) {
		console.error('Error on app initialization')
		console.error(e)
	}
}

run()
