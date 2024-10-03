import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { HomePage } from "../app/containers/HomePage"

// jest.mock("@/components", () => ({
//   AccordionItem: ({ items }) => (
//     <div data-testid="accordion">
//       {items.map((item, index) => (
//         <div key={index}>
//           <h2>{item.title}</h2>
//           <div>{item.content}</div>
//         </div>
//       ))}
//     </div>
//   ),
//   Table: ({ caption, headers, data }) => (
//     <div data-testid="table">
//       <caption>{caption}</caption>
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index}>{header.label}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {headers.map((header, headerIndex) => (
//               <td key={headerIndex}>{row[header.label]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </div>
//   )
// }))

describe("HomePage", () => {
  it("renders the accordion with correct titles", () => {
    render(<HomePage />)

    const accordion = screen.getByTestId("accordion")
    expect(accordion).toBeInTheDocument()

    expect(screen.getByText("Section 1 title")).toBeInTheDocument()
    expect(screen.getByText("Section 2 title")).toBeInTheDocument()
  })

  it("renders the table with the correct headers and data", () => {
    render(<HomePage />)

    const table = screen.getByTestId("table")
    expect(table).toBeInTheDocument()

    expect(screen.getByText("Imperial to metric conversion factors")).toBeInTheDocument()
  })
})
