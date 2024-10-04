"use client"

import "./_page.scss"
import { IHomePageProps } from "./types"
import React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack
} from "@chakra-ui/react"
import { Card, Comment } from "@/components"
import { AddIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import useSWR from "swr"
import { fetcher } from "@/components/utils/fetcher"
import { ICommentsPosts } from "@/app/types"

const API_COMMENTS = "https://jsonplaceholder.typicode.com/comments?postId="

function HomePage({ posts: initialPosts, users, handleDeletePost, handleInsertPost }: IHomePageProps) {
  const [postsPerUser, setPostsPerUser] = React.useState(initialPosts)
  const [selectedPost, setSelectedPost] = React.useState(0)
  const [shouldFetch, setShouldFetch] = React.useState(false)
  const [commentsFromPost, setCommentsFromPost] = React.useState<ICommentsPosts[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isLoading } = useSWR<ICommentsPosts[]>(shouldFetch && `${API_COMMENTS}${selectedPost}`, fetcher, {
    onSuccess: (data) => {
      setCommentsFromPost(data)
    }
  })

  React.useMemo(() => {
    setPostsPerUser(initialPosts)
  }, [initialPosts])

  const handleOpenComments = (postId: number) => {
    setSelectedPost(postId)
    setShouldFetch(true)
    onOpen()
  }

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <Accordion
        width="100%"
        data-testid="accordion"
        allowMultiple
      >
        {users?.map((user) => (
          <AccordionItem
            key={user.id}
            id={user.id.toString()}
          >
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box
                      as="div"
                      flex="1"
                      textAlign="left"
                    >
                      <Heading
                        noOfLines={1}
                        size="xl"
                      >
                        {user.name}
                      </Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  display="flex"
                  flexWrap="wrap"
                  gap="5px"
                >
                  <Button
                    colorScheme="teal"
                    aria-label="Call Segun"
                    size="sm"
                    leftIcon={<AddIcon />}
                    onClick={() => handleInsertPost(user.id)}
                  >
                    Post
                  </Button>
                  {isExpanded && (
                    <SimpleGrid
                      spacing={4}
                      columns={2}
                      overflowY="scroll"
                      maxHeight={300}
                      padding={5}
                    >
                      {postsPerUser
                        ?.find((item) => item.userId === user.id)
                        ?.posts?.map((post) => {
                          return (
                            <Card
                              key={post.id + user.id}
                              title={post.title}
                              content={post.body}
                              handleDelete={() => handleDeletePost(post.id)}
                              handleOpenComments={() => handleOpenComments(post.id)}
                            />
                          )
                        })}
                    </SimpleGrid>
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {commentsFromPost?.map((comment) => (
                <Comment
                  key={comment.id}
                  title={comment.name}
                  description={comment.body}
                  isLoading={isLoading}
                />
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export { HomePage }
