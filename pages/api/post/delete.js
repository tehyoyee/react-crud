import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(요청, 응답) {
	let session = await getServerSession(요청, 응답, authOptions)
	if (!session || session.user.email !== 요청?.body.email)
		응답.status(401).json('인증되지 않은 사용자')
	if (요청.method == 'DELETE') {
		const db = (await connectDB).db('forum')
		let result = await db.collection('post').deleteOne({
			_id : new ObjectId(요청.body._id)})
		if (result === 0)
			return 응답.status(500)
		return 응답.status(200).json('삭제완료')
	}
}