import { model, Schema, Document } from 'mongoose'
import * as crypto from 'crypto'

interface UserSchema extends Document {
	username: string
	passwordHash: Buffer
	salt: string
	password: string
	checkPassword: (password: string) => boolean
}

const userSchema = new Schema({
	username: String,
	passwordHash: Buffer,
	salt: String,
})

userSchema.virtual('password').set(function(password: string): void {
	if (password) {
		this.salt = crypto.randomBytes(128).toString('base64')
		this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
	}
})

userSchema.methods.checkPassword = function(password: string): boolean {
	return (
		!password ||
		crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString() ===
			this.passwordHash.toString()
	)
}

const User = model<UserSchema>('User', userSchema)

export default User
