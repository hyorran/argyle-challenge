"use client"

import { HomePage } from "@/app/containers/HomePage"
import useSWR from "swr"
import { fetcher } from "@/components/utils/fetcher"

const API_POSTS = "https://jsonplaceholder.typicode.com/posts"
const API_USERS = "https://jsonplaceholder.typicode.com/users"

export default function Home() {
  const { data: users } = useSWR(API_USERS, fetcher)
  const { data: posts } = useSWR(API_POSTS, fetcher)

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <HomePage
        posts={posts}
        users={users}
      />
    </div>
  )
}
