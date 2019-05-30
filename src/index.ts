import 'env'
import 'reflect-metadata'
import connection from 'db'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as passport from 'koa-passport'
import router from 'routes'

// import 'strategies'

const run = async () => {
	try {
		const app = new Koa()

		await connection()

		app.use(router.routes())
		app.use(router.allowedMethods())

		app.use(logger)
		app.use(passport.initialize())

		app.listen(3000, () => {
			console.log('Server started!')
		})
	} catch (e) {
		console.error('Error on app initialization')
		console.error(e)
	}
}

run()
