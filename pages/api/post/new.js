import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(요청, 응답) {
	let session = await getServerSession(요청, 응답, authOptions)
	요청.body.email = session.user.email
	if (!session)
		응답.status(401).json('인증되지 않은 사용자')
	if (요청.method == 'POST') {
		if (요청.body.title == '') {
			return 응답.status(500).json('제목 안씀')
		}
		const db = (await connectDB).db('forum')
		let result = await db.collection('post').insertOne(요청.body)
		응답.redirect(302, '/list')
	}
}