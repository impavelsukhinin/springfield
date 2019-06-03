import { Middleware } from 'koa'
import * as passport from 'koa-passport'
import * as jwt from 'jsonwebtoken'

export const login: Middleware = async (ctx, next) => {
	await passport.authenticate('local', (_, user) => {
		if (user) {
			const payload = {
				id: user.id,
				username: user.username,
			}

			const token = jwt.sign(payload, process.env.JWT_SECRET)

			ctx.body = { user: user.username, token: 'JWT ' + token }
		} else {
			ctx.body = 'Login failed'
		}
	})(ctx, next)
}

export const checkAuth: Middleware = async (ctx, next) => {
	await passport.authenticate('jwt', (_, user) => {
		if (user) {
			ctx.user = user
			return next()
		}

		return (ctx.status = 401)
	})(ctx, next)
}
