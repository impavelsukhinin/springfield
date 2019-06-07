import { model, Schema, Document } from 'mongoose'
import { CategorySchema } from './Category'

interface PostSchema extends Document {
	title: string
	content: string
	source: string
	categories: CategorySchema[]
}

const postSchema = new Schema(
	{
		title: String,
		content: String,
		source: String,
		categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	},
	{
		timestamps: true,
	},
)

const Post = model<PostSchema>('Post', postSchema)

export default Post
