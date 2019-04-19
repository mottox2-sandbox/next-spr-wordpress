import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const Index = props => {
  return (
    <>
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <Link href={`/post?id=${post.id}`}>{post.title.rendered}</Link>
          </div>
        )
      })}
    </>
  )
}

Index.getInitialProps = async () => {
  const res = await axios.get(`${process.env.WP_HOST}/wp-json/wp/v2/posts`)
  return {
    posts: res.data
  }
}

export default Index
