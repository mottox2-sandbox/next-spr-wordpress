import React from 'react'
import axios from 'axios'
import Link from 'next/link'

import { jsx, css, Global } from '@emotion/core'
import {
  Layer,
  Toolbar,
  Text,
  Navbar,
  DarkMode,
  Tabs,
  Tab,
  List,
  ListItem,
  IconChevronRight
} from 'sancho'
import Layout from '../components/layout'
import { withRouter } from 'next/router'

const Index = props => {
  return (
    <Layout tab={props.router.query.tab}>
      <List>
        {props.posts.map(post => {
          // console.log(post)
          return (
            <Link href={`/post?id=${post.id}`} key={post.id} passHref>
              <ListItem
                wrap={false}
                primary={post.title.rendered}
                secondary={post.excerpt.rendered}
                key={post.id}
                contentAfter={<IconChevronRight />}
              />
            </Link>
          )
        })}
      </List>
    </Layout>
  )
}

Index.getInitialProps = async ({ req, res }) => {
  if (res) {
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate')
  }
  const { data } = await axios.get(`${process.env.WP_HOST}/wp-json/wp/v2/posts`)
  return {
    posts: data
  }
}

export default withRouter(Index)
