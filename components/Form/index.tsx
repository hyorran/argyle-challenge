import React from "react"
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"

const StyledForm = () => {
  return (
    <>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          id="title"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder="Here is a sample placeholder"
          id="content"
        />
      </FormControl>
    </>
  )
}

export default StyledForm
