import * as Koa from 'koa'
import { Context } from 'koa'

const app = new Koa()

app.use(async (ctx: Context) => {
	ctx.body = 'Hello World'
})

app.listen(3000, () => {
	console.log('Сервер запущен!')
})
