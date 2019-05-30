import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm'

@Entity()
class User extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID

	@Column({ length: 50, unique: true })
	username: string

	@Column({ length: 100, nullable: true })
	password: string | undefined

	@Column({ length: 100, nullable: true })
	passwordHash: string | undefined
}

export default User
