'use client'

import { useEffect, useState } from "react"
import CommentList from "./CommentList"

export default function Comment({result}) {
	let [comment, setComment] = useState('')
	let [data, setData] = useState([])

	useEffect(()=>{
		fetch('/api/comment/list?id=' + result._id)
		.then(r=>r.json())
		.then((result)=>{
			setData(result)
		})
	}, [])
	let changeHandler = (e) => {
		setComment(e.target.value)
	}

	return (
		<div>
			{
				data.length > 0 ?
				data.map((a, i)=>
					<p key={i}>{a.content}</p>
				)
				: '댓글없음'
			}
			{
				<input onChange={changeHandler}/>
			}
			{/* <input onChange={(e)=>{
				setComment(e.target.value)
			}}/> */}
			<button onClick={()=>{
				fetch('/api/comment/new', {
					method: 'POST',
					body: JSON.stringify({
						content: comment,
						parent: result._id,
					})
				})
				.then(setComment(''))
				// .then(e.tar)
				.then(setData([...data, {content: comment}]))
			}}>댓글전송</button>
		</div>
	)
}