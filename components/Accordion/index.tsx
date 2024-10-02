import React, { ReactNode } from "react"
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react"

interface AccordionItemProps {
  title: string
  content: ReactNode
}

interface StyledAccordionProps {
  items: AccordionItemProps[]
}

const StyledAccordion: React.FC<StyledAccordionProps> = ({ items }) => {
  return (
    <Accordion width="100%">
      {items?.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
              >
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default StyledAccordion
