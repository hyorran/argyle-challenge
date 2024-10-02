"use client"

import "./_page.scss"
import { Accordion, Table } from "@/components"

const headers = [{ label: "To convert" }, { label: "into" }, { label: "multiply by", isNumeric: true }]

const conversionData = [
  { "To convert": "inches", into: "millimetres (mm)", "multiply by": 25.4 },
  { "To convert": "feet", into: "centimetres (cm)", "multiply by": 30.48 },
  { "To convert": "yards", into: "metres (m)", "multiply by": 0.91444 }
]

const accordionItems = [
  {
    title: "Section 1 title",
    content: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button>Click Me</button>
      </div>
    )
  },
  {
    title: "Section 2 title",
    content: (
      <div>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      </div>
    )
  }
]

function HomePage() {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.warn(json))

  return (
    <div
      style={{
        width: "100%"
      }}
    >
      <Accordion items={accordionItems} />
      <Table
        caption="Imperial to metric conversion factors"
        headers={headers}
        data={conversionData}
      />
    </div>
  )
}

export { HomePage }
