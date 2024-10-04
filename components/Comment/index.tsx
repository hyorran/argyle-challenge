import React from "react"
import { Avatar, Box, SkeletonCircle, SkeletonText, Text, Wrap, WrapItem } from "@chakra-ui/react"

interface ICommentProps {
  title: string
  description: string
  isLoading: boolean
}

const Comment = ({ title, description, isLoading }: ICommentProps) => {
  return isLoading ? (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
    >
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={4}
        spacing="4"
        skeletonHeight="2"
      />
    </Box>
  ) : (
    <Box
      p={5}
      shadow="md"
      borderWidth={1}
      borderRadius={6}
    >
      <Text
        mt={4}
        fontSize="xl"
      >
        {description}
      </Text>
      <Wrap
        align="end"
        justify="end"
      >
        <WrapItem>
          <Avatar
            name={title}
            size="2xs"
          />
        </WrapItem>
        <WrapItem>
          <Text fontSize="xs">{title}</Text>
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default Comment
