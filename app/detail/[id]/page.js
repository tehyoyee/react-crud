import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./Comment"
import { notFound } from "next/navigation"
 
export default async function Detail(props) {
	const db = (await connectDB).db('forum') // 축약가능
	try {
		var result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })
	} catch (e) {
		return notFound()
	}
	// let commentList = await db.collection('comments').findOne({ parent: new ObjectId(props.params.id) }).toArray()
	// console.log(commentList)
	// result._id = result._id.toString()
	result._id = props.params.id
	// console.log(props)
	return (
		<div>
			<h4>상세페이지</h4>
			<h4>{ result.title }</h4>
			<p>{ result.content }</p>
			
			{/* <CommentList result={ result }/> */}
			<Comment result={ result }/>
		</div>
	)
}