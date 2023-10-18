import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"

export default async function handler(요청, 응답) {
	let session = await getServerSession(요청, 응답, authOptions)
	let body = JSON.parse(요청.body)
	if (!session)
		응답.status(401).json('인증되지 않은 사용자')
	body.author = session.user.email
	body.parent = new ObjectId(body.parent)
	if (요청.method == 'POST') {
		if (body.content === '') {
			return 응답.status(500).json('내용 안씀')
		} else {
			const db = (await connectDB).db('forum')
			let result = await db.collection('comments').insertOne(body)
			if (result === 0)
				응답.status(500).json('올리는 도중 에러')
			응답.status(200).json('댓글작성완료')
		}
	}
}