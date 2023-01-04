import { describe, it, expect } from 'vitest'
import { useTree } from '@/composables/useTree'
import { createUser, createUserNode } from '@/tests/test-utils'

describe('arrayToTree', () => {
  const { arrayToTree } = useTree()

  it('list to tree', () => {
    const list = [
      createUser({ id: 1, parentId: 0 }),
      createUser({ id: 2, parentId: 1 }),
    ]

    const tree = [
      createUserNode(
        { id: 1, parentId: 0 },
        [createUserNode({ id: 2, parentId: 1 })]
      )
    ]

    expect(arrayToTree(list)).toStrictEqual(tree)
  })

  it('empty array to tree', () => {
    expect(arrayToTree([])).toStrictEqual([])
  })
})

describe('filterTree', () => {
  const { filterTree } = useTree()

  const tree = [
    createUserNode(
      { id: 1, parentId: 0, name: 'Басков', email: 'baskov@mail.com' },
      [
        createUserNode({ id: 2, parentId: 1, name: 'Киркоров', email: 'kirkorov@mail.com' })
      ]
    ),
    createUserNode({ id: 3, parentId: 0, name: 'Якубович', email: 'ya@mail.com' })
  ]

  it('filter tree by fields', () => {
    const result = [createUserNode({ id: 3, parentId: 0, name: 'Якубович', email: 'ya@mail.com' })]

    expect(filterTree(tree, { name: 'Якубович' })).toStrictEqual(result)
    expect(filterTree(tree, { name: 'Якубович', email: 'ya@mail.com' })).toStrictEqual(result)
    expect(filterTree(tree, { name: 'Якубович', email: 'kirkorov@mail.com' })).toStrictEqual([])
  })

  it('filter tree by parent fields', () => {
    const result = [createUserNode({ id: 1, parentId: 0, name: 'Басков', email: 'baskov@mail.com' })]

    expect(filterTree(tree, { email: 'baskov@mail.com' })).toStrictEqual(result)
  })

  it('filter tree by child fields', () => {
    const result = [
      createUserNode(
        { id: 1, parentId: 0, name: 'Басков', email: 'baskov@mail.com' },
        [
          createUserNode({ id: 2, parentId: 1, name: 'Киркоров', email: 'kirkorov@mail.com' })
        ]
      ),
    ]

    expect(filterTree(tree, { email: 'kirkorov@mail.com' })).toStrictEqual(result)
  })

  it('filter tree by empty fields', () => {
    expect(filterTree(tree, {})).toBe(tree)
  })
})
