import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTable from '@/components/ui/Table.vue'
import UiTableRow from '@/components/ui/TableRow.vue'
import UiTableCell from '@/components/ui/TableCell.vue'
import AppUsersTableRow from '@/components/app/UsersTableRow.vue'
import AppUsersTable from '@/components/app/UsersTable.vue'
import { createUserNode } from '@/tests/test-utils'
import { UserNode } from '@/types'

function createWrapper(users: UserNode[]) {
  return mount(AppUsersTable, {
    global: {
      components: {
        UiTable,
        UiTableRow,
        UiTableCell,
        AppUsersTableRow,
        AppUsersTableExpandButton: { template: '<button>expand</button>' },
        AppUsersTableStatus: { template: '<div />' },
      },
    },
    props: {
      users
    }
  })
}

describe('UsersTable', () => {
  it('render with data', async () => {
    const users = [
      createUserNode({ id: 1, parentId: 0 })
    ]

    const wrapper = createWrapper(users)

    expect(wrapper.findComponent(AppUsersTableRow).exists()).toBe(true)
  })

  it('render without data', () => {
    const wrapper = createWrapper([])

    expect(wrapper.find('tbody').find('td').text()).toBe('no data available')
  })
})
