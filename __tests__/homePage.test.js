import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { HomePage } from "../app/containers/HomePage"
import { ChakraProvider } from "@chakra-ui/react"
import useSWR from "swr"

// Mock the SWR hook and fetcher
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockSWR = useSWR

// Mock the useDisclosure hook from Chakra UI
jest.mock("@chakra-ui/hooks", () => ({
  useDisclosure: () => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn()
  })
}))

const mockUsers = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" }
]

const mockPosts = [
  {
    userId: 1,
    posts: [
      { id: 101, title: "Post 1", body: "Content of post 1" },
      { id: 102, title: "Post 2", body: "Content of post 2" }
    ]
  },
  {
    userId: 2,
    posts: [{ id: 103, title: "Post 3", body: "Content of post 3" }]
  }
]

const renderComponent = (props = {}) => {
  const defaultProps = {
    posts: mockPosts,
    users: mockUsers,
    handleDeletePost: jest.fn(),
    handleInsertPost: jest.fn()
  }

  return render(
    <ChakraProvider>
      <HomePage
        {...defaultProps}
        {...props}
      />
    </ChakraProvider>
  )
}

describe("HomePage Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    mockSWR.mockReturnValue({
      data: null,
      isLoading: false
    })
  })

  test("renders accordion and users", () => {
    renderComponent()

    const accordion = screen.getByTestId("accordion")
    expect(accordion).toBeInTheDocument()

    const user1 = screen.getByText("User 1")
    const user2 = screen.getByText("User 2")
    expect(user1).toBeInTheDocument()
    expect(user2).toBeInTheDocument()
  })

  test("renders posts for a user when accordion is expanded", () => {
    renderComponent()

    const user1Button = screen.getByText("User 1")
    fireEvent.click(user1Button)

    const post1 = screen.getByText("Post 1")
    const post2 = screen.getByText("Post 2")
    expect(post1).toBeInTheDocument()
    expect(post2).toBeInTheDocument()
  })
})
