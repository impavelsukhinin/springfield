import * as Router from 'koa-router'

import AdminController from 'controllers/Admin'

const adminRouter = new Router()

adminRouter.get('/remove_all_users', AdminController.removeAllUsers)
adminRouter.get('/get_users', AdminController.getUsers)
adminRouter.get('/create_admin', AdminController.createAdminUser)

export { adminRouter }
