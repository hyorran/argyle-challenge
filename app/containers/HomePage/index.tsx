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
  Divider
} from "@chakra-ui/react"

function HomePage({ posts: initialPosts, users, handleDeletePost }: IHomePageProps) {
  const [postsPerUser, setPostsPerUser] = React.useState(initialPosts)

  React.useMemo(() => {
    setPostsPerUser(initialPosts)
  }, [initialPosts])

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
            style={{ border: "1px solid green" }}
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
                      {user.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <button onClick={() => console.warn("add: ", user.id)}>add</button>
                  {isExpanded && (
                    <div
                      style={{
                        border: "1px solid red",
                        overflow: "scroll",
                        maxHeight: 300
                      }}
                    >
                      {postsPerUser
                        ?.find((item) => item.userId === user.id)
                        ?.posts?.map((post) => {
                          return (
                            <div key={post.id}>
                              <Divider />
                              <button onClick={() => handleDeletePost(post.id)}>delete</button>
                              <p>title: {post.title}</p>
                              <p>content: {post.body}</p>
                            </div>
                          )
                        })}
                    </div>
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export { HomePage }
