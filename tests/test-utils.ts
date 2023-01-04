import { User, UserNode } from "@/types";

export function createUser(fields: Partial<User>): User {
  return {
    id: 1,
    parentId: 0,
    name: 'Якубович',
    email: 'yakub@mail.com',
    balance: "$3,655.34",
    isActive: true,
    ...fields
  }
}

export function createUserNode(fields: Partial<User>, children: UserNode[] = []): UserNode {
  return {
    ...createUser(fields),
    children
  }
}
