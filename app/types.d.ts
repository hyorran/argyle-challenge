export interface IPosts {
  id: number
  body: string
  title: string
  userId: number
}

export interface IPostsPerUsers {
  posts: IPosts[] | undefined
  userId: number
}

export interface IGeoLocalization {
  lat: string
  lng: string
}

export interface ICompany {
  name: string
  bs: string
  catchPhrase: string
}

export interface IAddress {
  city: string
  street: string
  suite: string
  zipcode: string
  geo: IGeoLocalization
  company: ICompany
}

export interface IUsers {
  id: number
  name: string
  username: string
  phone: string
  email: string
  website: string
  address: IAddress
}

export interface IHomePageProps {
  posts?: IPostsPerUsers[] | undefined
  users?: IUsers[] | undefined
  handleDeletePost: (postId: number) => void
  loading: boolean
}
