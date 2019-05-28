import { createConnection, Connection } from 'typeorm'

export default async (): Promise<Connection> =>
	await createConnection({
		type: 'mongodb',
		host: 'localhost',
		port: 27017,
		database: 'test',
	})
