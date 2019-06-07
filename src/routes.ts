import * as Router from 'koa-router'

import * as AdminController from 'controllers/Admin'
import * as AuthController from 'controllers/Auth'

const router = new Router()

if (process.env.NODE_ENV === 'development') {
	// Admin
	router.get('/remove_all_users', AdminController.removeAllUsers)
	router.get('/get_users', AdminController.getUsers)
	router.get('/create_admin', AdminController.createAdminUser)
}

// Login
router.post('/login', AuthController.login)
router.get('/check', AuthController.checkAuth, (ctx) => {
	ctx.body = JSON.stringify(ctx.user)
})

router.get('/cr_cat', AuthController.createCategory)
router.get('/cr_post', AuthController.createPost)
router.get('/posts', AuthController.getPosts)

export default router
