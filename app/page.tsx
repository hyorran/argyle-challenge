"use client"

import { HomePage } from "@/app/containers/HomePage"
import useSWR from "swr"
import { fetcher } from "@/components/utils/fetcher"
import React from "react"
import { IPosts, IPostsPerUsers, IUsers } from "@/app/types"
import { useDisclosure } from "@chakra-ui/hooks"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useToast
} from "@chakra-ui/react"
import { Form } from "@/components"

const API_POSTS = "https://jsonplaceholder.typicode.com/posts"
const API_USERS = "https://jsonplaceholder.typicode.com/users"

export default function Home() {
  const [postsPerUser, setPostsPerUser] = React.useState<IPostsPerUsers[]>()
  const [allPosts, setAllPosts] = React.useState<IPosts[]>([])
  const [formData, setFormData] = React.useState({
    id: -1,
    userId: -1,
    body: "",
    title: ""
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()

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
      toast({
        title: "Post removed.",
        description: "We've successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true
      })
      // did this just to update visually when removing a post 2
      setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
    })
  }

  const handleInsertPost = (userId: number) => {
    setFormData({
      body: "",
      id: 0,
      title: "",
      userId
    })
    onOpen()
  }

  const handleCloseModal = () => {
    setFormData({ body: "", id: 0, title: "", userId: -1 })
    onClose()
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const tempData = {
      userId: formData.userId,
      id: Math.random(),
      title: event.currentTarget.elements.title.value,
      body: event.currentTarget.elements.content.value
    }

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(tempData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(() => {
        setAllPosts((prevPosts) => [...prevPosts, tempData])
        toast({
          title: "Post added.",
          description: "We've successfully created the post.",
          status: "success",
          duration: 3000,
          isClosable: true
        })
      })
      .then(() => {
        onClose()
      })
  }

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <Skeleton isLoaded={!isLoading}>
        <HomePage
          posts={postsPerUser}
          users={users}
          handleDeletePost={handleDeletePost}
          handleInsertPost={handleInsertPost}
          loading={isLoading}
        />
      </Skeleton>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Form />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}
