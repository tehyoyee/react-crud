import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
	const db = (await connectDB).db('forum')
	console.log(요청.body)
	let result = await db.collection('post').deleteOne({
		_id : new ObjectId(요청.query.id)})
	if (result === 0)
		return 응답.status(500)
	return 응답.status(200).json('삭제완료')
}
