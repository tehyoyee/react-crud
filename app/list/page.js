import { connectDB } from "@/util/database"
import Link from "next/link"
import DetailLink from "./DetailLink"
import ListItem from "./ListItem"

export default async function List() {

	const db = (await connectDB).db('forum') // 축약가능
	let result = await db.collection('post').find().toArray()
	result = result.map((a)=>{
		a._id = a._id.toString()
		return a
	})
	return (
		<div className="list-bg">
			<ListItem result={result} />
		</div>
	)
}