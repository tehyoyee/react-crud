import { connectDB } from "@/util/database"

export default async function Home() {

  const client = await connectDB
  const db = client.db('forum')
  // const db = (await connectDB).db('forum') // 축약가능

  let result = await db.collection('post').find().toArray()  // 모두 가져와서 array로
  
  console.log(result)

  // await fetch('URL', {next : {revalidate : 60}})

  return (
    <div>

    </div>
  )
}
