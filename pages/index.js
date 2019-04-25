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

Index.getInitialProps = async ({ req, res }) => {
  if (res) {
    res.setHeader('Cache-Control', 'max-age=1, stale-while-revalidate=10')
  }
  const { data } = await axios.get(`${process.env.WP_HOST}/wp-json/wp/v2/posts`)
  return {
    posts: data
  }
}

export default Index
