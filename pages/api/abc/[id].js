export default function handler(요청, 응답) {
	console.log('다이나믹 라우트', 요청.query)
	return 응답.status(200).json()
}