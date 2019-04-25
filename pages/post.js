import axios from 'axios'
import Link from 'next/link'

const Post = props => {
  console.log(props)
  const post = props.post
  return (
    <>
      <Link href="/">Back to home</Link>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </>
  )
}

Post.getInitialProps = async props => {
  console.log(Object.keys(props))
  if (props.res) {
    props.res.setHeader('Cache-Control', 'max-age=1, stale-while-revalidate=10')
  }
  const { data } = await axios.get(`${process.env.WP_HOST}/wp-json/wp/v2/posts/${props.query.id}`)
  return {
    post: data
  }
}

export default Post
