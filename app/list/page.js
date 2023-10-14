import { connectDB } from "@/util/database"
import Link from "next/link"
import DetailLink from "./DetailLink"

export default async function List() {

	const db = (await connectDB).db('forum') // 축약가능
	let result = await db.collection('post').find().toArray()

	return (
		<div className="list-bg">
		{
			result.map((a, i) => {
				return (
					<div className="list-item" key={i}>
					<Link href={'/detail/' +  result[i]._id}>
						<h4>{ result[i].title }</h4>
					</Link>
					{/* <DetailLink></DetailLink> */}
					<Link href={ '/edit/' + result[i]._id } className="list-btn"> 수정 </Link>
					<p>1월 1일</p>
		  		</div>
				)
			})
		}   
		</div>
	)
}