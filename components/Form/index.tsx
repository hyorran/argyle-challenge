import React from "react"
import { FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react"

const StyledForm = () => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          id="title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Content</FormLabel>
        <Textarea id="content" />
      </FormControl>
    </Stack>
  )
}

export default StyledForm
