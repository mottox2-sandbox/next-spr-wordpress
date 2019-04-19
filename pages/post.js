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
  const res = await axios.get(`${process.env.WP_HOST}/wp-json/wp/v2/posts/${props.query.id}`)
  return {
    post: res.data
  }
}

export default Post
