import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import Category from './Category'

@Entity()
class Post extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID

	@Column({ length: 200, unique: true })
	title: string

	@Column()
	content: string

	@Column()
	source: string

	@Column(type => Category)
	categories: Category[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updateAt: Date
}

export default Post
