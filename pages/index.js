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

const Index = props => {
  return (
    <>
      <Global
        styles={{
          body: {
            padding: 0,
            margin: 0
          }
        }}
      />
      <Toolbar
        style={{
          backgroundColor: 'rgb(52, 58, 64)'
        }}
      >
        <DarkMode>
          <Text varient="h5">Demo Blog with WP REST API</Text>
        </DarkMode>
      </Toolbar>
      <DarkMode>
        <Tabs
          css={css`
            background-color: rgb(52, 58, 64);
          `}
        >
          <Tab>All</Tab>
          <Tab>Develop</Tab>
          <Tab>Design</Tab>
          <Tab>Event</Tab>
        </Tabs>
      </DarkMode>
      <List>
        {props.posts.map(post => {
          console.log(post.id)
          return (
            <Link href={`/post?id=${post.id}`} key={post.id}>
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
