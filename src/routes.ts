import * as Router from 'koa-router'
import User from 'entity/User'

const router = new Router()

router.get('/user', async (ctx) => {
	const users = await User.find()
	ctx.body = JSON.stringify(users)
})

router.get('/create_user', async (ctx) => {
	try {
		const user = new User()
		user.username = 'Testasdasda2323523'
		user.password = '123456234'
		user.passwordHash = 'dsdfsdfasdfwfdf'
		await user.save()
	} catch (e) {
		console.log(e)
	}
	ctx.body = 'create mb'
})

export default router
