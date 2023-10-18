'use client'

import Link from "next/link"
import { useEffect } from "react"

export default function ListItem(props) {
	// 'use client'에서의 코드는 모두 브라우저에 보이기 때문에 직접적으로 꺼내면 안된다.
	// 서버에 부탁하듯이 꺼낸다.
	// const db = (await connectDB).db('forum') // 축약가능
	// let result = await db.collection('post').find().toArray()

	// useEffect는 html을 다 보여주고 실행된다
	// 처음에 html이 비어있기때문에 검색엔진이 빈 상태를 본다 검색에 안좋음
	// 그래서 부모 컴포넌트에서 props로 갖다 줘야한다. 그래야 검색이 잘됨.
	// let session = await getServerSession(authOptions)

	return (
		<div>
		{
			props.result.map((a,i)=>
				<div className="list-item" key={i}>
					<Link href={'/detail/' +  props.result[i]._id}>
						<h4>{ props.result[i].title }</h4>
					</Link>
					{/* <DetailLink></DetailLink> */}
					
					<Link href={ '/edit/' + props.result[i]._id } className="list-btn"> 수정 </Link>
					<button onClick={(e)=> {
						if (props.result[i]?.email === props?.session.user.email) {
							fetch('/api/post/delete', {
								method: 'DELETE',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									_id: props.result[i]._id,
									email: props.result[i]?.email
								})
							}).then((r)=>{
								// 삭제 완료 됨.
								if (r.status == 200) {
									return r.json()
								} else {
									//실패시 실행할 코드
								}
							})
							.then((r)=>{
								console.log(r)
							})
							.then(() => {
								e.target.parentElement.style.opacity=0
								setTimeout(() => {
									e.target.parentElement.style.display = 'none'
								}, 1000)
							})
							// fetch('/api/post/delete2?id=' + props.result[i]._id
							// ).then((r)=>{
							// 	if (r.status == 200) {
							// 		return r.json()
							// 	} else {
							// 		// 실패시 실행할 코드
							// 	}
							// })
							// .then((r) => {
							// 	console.log(r)
							// })
							// .then(() => {
							// 	e.target.parentElement.style.opacity = 0
							// 	setTimeout(() => {
							// 		e.target.parentElement.style.display = 'none'
							// 	}, 1000)
							// })
							// fetch('/api/abc/2')
						}
					}}>삭제</button>
					<p>1월 1일</p>
				</div>
			)
		}
		</div>
	)
}