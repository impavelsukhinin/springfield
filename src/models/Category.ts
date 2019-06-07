import { model, Schema, Document } from 'mongoose'

export interface CategorySchema extends Document {
	name: string
}

const categorySchema = new Schema({
	name: String,
})

const Post = model<CategorySchema>('Category', categorySchema)

export default Post
