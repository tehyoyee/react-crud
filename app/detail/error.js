'use client'
export default function Error({ error, reset }) {
	// console.log(error)
	return (
		<div>
			<h4>에러남 ㅅㄱerror </h4>
			<button onClick={()=>{
				reset()
			}}>버튼</button>
		</div>
	)
}