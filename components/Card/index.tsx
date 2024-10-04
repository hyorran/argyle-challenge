"use client"

import React from "react"
import { Card, CardBody, CardHeader, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons"

interface ICardProps {
  title: string
  content: string
  handleDelete: () => void
  handleOpenComments: () => void
}

const StyledCard = ({ title, content, handleDelete, handleOpenComments }: ICardProps) => {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{content}</Text>
      </CardBody>
      <Stack
        direction="row"
        justify="right"
        padding={5}
      >
        <IconButton
          variant="solid"
          colorScheme="teal"
          aria-label="Send email"
          size="xs"
          onClick={handleOpenComments}
          icon={<ChatIcon />}
        />
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Send email"
          size="xs"
          onClick={handleDelete}
          icon={<DeleteIcon />}
        />
      </Stack>
    </Card>
  )
}

export default StyledCard
