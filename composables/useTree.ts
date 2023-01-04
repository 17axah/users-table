interface Item {
  id: number
  parentId: number
}

type Node<T> = T & {
  children: Node<T>[]
}

type Filters<T> = Partial<Record<keyof T, any>>

function arrayToTree<T extends Item>(array: T[]) {
  const map = new Map()

  return array.reduce((acc: Node<T>[], item: T) => {
    const root = item.parentId === 0
    const node = { ...item, children: [] }

    if (!map.has(item.id)) {
      map.set(item.id, node)
    }

    if (!root) {
      if (map.has(item.parentId)) {
        map.get(item.parentId).children.push(node)
      } else {
        map.set(item.parentId, { children: [node] })
      }
    }

    return root ? [...acc, node] : acc
  }, [])
}

function filterTree<T>(tree: Node<T>[], filters: Filters<T>) {
  const entries = Object.entries(filters)

  if (!entries.length) {
    return tree
  }

  function compareNode(node: T) {
    return entries.every(([key, value]) => node[key as keyof T] === value)
  }

  function filterNodes(nodes: Node<T>[], node: Node<T>): Node<T>[] {
    const children = node.children.reduce(filterNodes, [])

    return compareNode(node) || children.length
      ? [...nodes, { ...node, children }]
      : nodes
  }

  return tree.reduce(filterNodes, [])
}

export function useTree() {
  return {
    arrayToTree,
    filterTree,
  }
}
