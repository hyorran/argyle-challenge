import { IPostsPerUsers, IUsers } from "@/app/types"

export interface IHomePageProps {
  posts?: IPostsPerUsers[] | undefined
  users?: IUsers[] | undefined
  handleDeletePost: (postId: number) => void
  handleInsertPost: (userId: number) => void
  loading: boolean
}
