import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm'
import * as crypto from 'crypto'

@Entity()
class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID

	@Column({ length: 50, unique: true })
	username: string

	@Column()
	salt: string

	@Column()
	passwordHash: Buffer

	constructor(...[username, password]: string[]) {
		super()

		this.username = username
		this.password = password
	}

	public checkPassword(password: string): boolean {
		return (
			!password ||
			crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString() ===
				this.passwordHash.toString()
		)
	}

	private set password(password: string) {
		if (password) {
			this.salt = crypto.randomBytes(128).toString('base64')
			this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
		}
	}
}

export default User
