"use client"

import { HomePage } from "@/app/containers/HomePage"
import useSWR from "swr"
import { fetcher } from "@/components/utils/fetcher"
import React from "react"
import { IPosts, IPostsPerUsers, IUsers } from "@/app/containers/HomePage/types"

const API_POSTS = "https://jsonplaceholder.typicode.com/posts"
const API_USERS = "https://jsonplaceholder.typicode.com/users"

export default function Home() {
  const [postsPerUser, setPostsPerUser] = React.useState<IPostsPerUsers[]>()
  const [allPosts, setAllPosts] = React.useState<IPosts[]>([])

  const { data: users } = useSWR<IUsers[]>(API_USERS, fetcher)
  const { isLoading } = useSWR<IPosts[]>(API_POSTS, fetcher, {
    // did this just to update visually when removing a post 1
    onSuccess: (data) => setAllPosts(data)
  })

  React.useEffect(() => {
    if (users && allPosts) {
      const tempPosts = users.map((user) => {
        const postsFromUser = allPosts.filter((post) => post.userId === user.id)
        return {
          userId: user.id,
          posts: postsFromUser
        }
      })
      setPostsPerUser(tempPosts)
    }
  }, [allPosts, users])

  const handleDeletePost = async (postId: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE"
    }).then(() => {
      // did this just to update visually when removing a post 2
      setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
    })
  }

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <HomePage
        posts={postsPerUser}
        users={users}
        handleDeletePost={handleDeletePost}
        loading={isLoading}
      />
    </div>
  )
}
