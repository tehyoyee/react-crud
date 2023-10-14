import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
	if (요청.method == 'POST') {
		if (요청.body.title == '') {
			return 응답.status(500).json('제목 안씀')
		}
		let newObj = { title: 요청.body.title, content: 요청.body.content }
		const db = (await connectDB).db('forum')
		let result = await db.collection('post').updateOne({
			_id : new ObjectId(요청.body._id) },
			{ $set : newObj })
		return 응답.redirect(302, '/list')
	}
}