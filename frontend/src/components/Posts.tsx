import React from 'react'
import Post from './Post.tsx'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store.ts'

const Posts = () => {
  const posts = useSelector((store: RootState) => store.post.posts) || [];
  return (
    <div>
        {
            posts.map((post) => <Post key={post._id} post={post}/>)
        }
    </div>
  )
}

export default Posts