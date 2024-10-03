import React, { ReactNode } from "react"
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react"

interface StyledAccordionProps {
  id: number
  body: ReactNode
  title: string
  children?: ReactNode
}

const StyledAccordionItem: React.FC<StyledAccordionProps> = ({ id, title, children }) => {
  return (
    <AccordionItem key={id}>
      <h2>
        <AccordionButton>
          <Box
            as="span"
            flex="1"
            textAlign="left"
          >
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  )
}

export default StyledAccordionItem
