import React from "react"
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"

interface TableData {
  [key: string]: string | number
}

interface StyledTableProps {
  caption: string
  headers: { label: string; isNumeric?: boolean }[]
  data: TableData[]
}

const StyledTable: React.FC<StyledTableProps> = ({ caption, headers, data }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                isNumeric={header.isNumeric}
              >
                {header.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <Td
                  key={colIndex}
                  isNumeric={header.isNumeric}
                >
                  {row[header.label]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                isNumeric={header.isNumeric}
              >
                {header.label}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default StyledTable
