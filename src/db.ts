import { createConnection, Connection } from 'typeorm'

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

export default async (): Promise<Connection> =>
	await createConnection({
		type: 'mongodb',
		host: 'mongo',
		port: 27017,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		useNewUrlParser: true,
		entities: ['src/entity/*.ts'],
		synchronize: true,
	})
