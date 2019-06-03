import { Middleware } from 'koa'

import User from 'entity/User'

const { ADMIN_NAME, ADMIN_PASS } = process.env

export const removeAllUsers: Middleware = async (ctx) => {
	await User.remove(await User.find())

	ctx.redirect('/get_users')
}

export const getUsers: Middleware = async (ctx) => {
	const users = await User.find()

	ctx.body = JSON.stringify(users)
}

export const createAdminUser: Middleware = async (ctx, next) => {
	try {
		const mbExist = await User.findOne({ username: ADMIN_NAME })

		if (mbExist) {
			ctx.body = 'Already exist'
			return next()
		}

		const user = new User(ADMIN_NAME, ADMIN_PASS)

		await user.save()
		ctx.body = 'Done!'
	} catch (e) {
		console.log(e)
	}
}
