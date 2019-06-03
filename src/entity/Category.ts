import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm'

@Entity()
class Category extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID

	@Column({ length: 150, unique: true })
	name: string

	constructor(name: string) {
		super()

		this.name = name
	}
}

export default Category
