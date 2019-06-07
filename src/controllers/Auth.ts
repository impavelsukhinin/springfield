import { Middleware } from 'koa'
import * as passport from 'koa-passport'
import * as jwt from 'jsonwebtoken'

import Category from 'models/Category'
import Post from 'models/Post'

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

export const createCategory: Middleware = async (ctx) => {
	const t = new Category({ name: 'Test' })
	await t.save()
	ctx.body = 'Uh ebati'
}

export const createPost: Middleware = async (ctx) => {
	const t = new Post({
		title: 'wfwrfwrf',
		source: 'puk',
	})
	const category = await Category.findOne({ name: 'Test' })

	t.categories = [category]

	const loh = await t.save()

	ctx.body = JSON.stringify(loh)
}

export const getPosts: Middleware = async (ctx) => {
	const post = await Post.findOne()
		.populate('categories')
		.exec()

	ctx.body = JSON.stringify(post)
}
