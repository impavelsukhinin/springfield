import { createConnection, Connection } from 'typeorm'

export default async (): Promise<Connection> =>
	await createConnection({
		type: 'mongodb',
		host: 'mongo',
		port: 27017,
		database: 'test',
		useNewUrlParser: true,
	})
