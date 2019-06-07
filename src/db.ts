import * as mongoose from 'mongoose'
import { Mongoose } from 'mongoose'

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

export default async (): Promise<Mongoose> =>
	await mongoose.connect(
		`mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongo:27017/${DB_NAME}`,
		{
			useNewUrlParser: true,
		},
	)
