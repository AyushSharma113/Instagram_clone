import React from 'react'
import Post from './Post.tsx'

const Posts = () => {
//   const {posts} = useSelector(store=>store.post);
  return (
    <div>
        {/* {
            posts.map((post) => <Post key={post._id} post={post}/>)
        } */}
        <Post />
    </div>
  )
}

export default Posts