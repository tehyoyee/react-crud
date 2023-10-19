'use client'

import { useEffect, useState } from "react"

export default function Write() {
	let [src, setSrc] = useState('')
	let [srcLocal, setSrcLocal] = useState('')
	let [imageFile, setImageFile] = useState(null)
	// const onChangeImage = e => {
		
	// 	let file = e.target.files[0]
	// 	if (file) {
	// 		const image = window.URL.createObjectURL(file)
	// 		setSrcLocal(image)
	// 		setImageFile = e.target.files[0]
	// 		console.log(e.target.files[0])
	// 		console.log(imageFile)
	// 	}
	// }
	useEffect(()=>{
		if (imageFile) {
			console.log(imageFile)
		}
	}, [imageFile, onClick])

	return (
		<div className="p-20">
			<h4>글작성</h4>
			<form action='/api/post/new' method="POST">
				<input name='title' placeholder='글제목'/>
				<input name='content' placeholder='글내용'/>
				<input type='file' accept="image/*"
				// onChange={onChangeImage}
					onChange={async (e)=>{
						// let file = e.target.files[0]
						// if (file) {
						// 	let image = window.URL.createObjectURL(file)
						// 	setMainImage(image)
						// 	setMainImageFile(file)
						// }

						var file = e.target.files[0]
						if (file) {
							const image = window.URL.createObjectURL(file)
							await setSrcLocal(image)
							await setImageFile(file)
							// console.log('asd', imageFile)
							// console.log(image)
							// console.log(imageFile[imageFile.length-1])
							// console.log(file)
						}
						// let filename = encodeURIComponent(file.name)
						// let res = await fetch('/api/post/image?file=' + filename)
						// res = await res.json()
						// //S3 업로드
						// const formData = new FormData()
						// Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
						//   formData.append(key, value)
						// })
						// let 업로드결과 = await fetch(res.url, {
						//   method: 'POST',
						//   body: formData,
						// })
						// console.log('업로드결과', 업로드결과)
			  
						// if (업로드결과.ok) {
						//   setSrc(업로드결과.url + '/' + filename)
						// } else {
						// 	console.log('실패')
						// }
					}}
				/>
				<img src={ srcLocal }/>
				{/* <img src={ mainImage } /> */}
				{/* <button type='submit'>버튼</button> */}
				<button onClick={ async ()=>{
					console.log('asdf', imageFile)
					let filename = encodeURIComponent(imageFile.name)
					let res = await fetch('/api/post/image?file=' + filename)
					res = await res.json()
					//S3 업로드
					const formData = new FormData()
					Object.entries({ ...res.fields, imageFile }).forEach(([key, value]) => {
					  formData.append(key, value)
					})
					let 업로드결과 = await fetch(res.url, {
					  method: 'POST',
					  body: formData,
					})
					console.log('업로드결과', 업로드결과)
			
					if (업로드결과.ok) {
					  setSrc(업로드결과.url + '/' + filename)
					} else {
						console.log('실패')
					}
				}}>버튼</button>
			</form>
		</div>
	)
}