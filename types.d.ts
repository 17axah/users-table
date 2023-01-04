export interface User {
  id: number
  parentId: number
  isActive: boolean
  balance: string
  name: string
  email: string
}

export interface UserNode extends User {
  children: UserNode[]
}
