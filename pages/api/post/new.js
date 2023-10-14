import { connectDB } from "@/util/database"

export default async function handler(요청, 응답) {
	if (요청.method == 'POST') {
		if (요청.body.title == '') {
			return 응답.status(500).json('제목 안씀')
		}
		const db = (await connectDB).db('forum')
		let result = await db.collection('post').insertOne(요청.body)
		return 응답.redirect(302, '/list')
	}
}