import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiTableRow from '@/components/ui/TableRow.vue'
import UiTableCell from '@/components/ui/TableCell.vue'
import AppUsersTableRow from '@/components/app/UsersTableRow.vue'
import { createUserNode } from '@/tests/test-utils'

function createWrapper(props: any) {
  return mount(AppUsersTableRow, {
    global: {
      components: {
        UiTableRow,
        UiTableCell,
        AppUsersTableRow,
      }
    },
    props
  })
}

describe('UsersTableRow', () => {
  it('expanding child row', async () => {
    const headers = [
      {
        label: '',
        key: 'name'
      }
    ]

    const wrapper = createWrapper({
      user: createUserNode(
        { id: 1, parentId: 0 },
        [
          createUserNode({ id: 2, parentId: 1 })
        ]
      ),
      expanded: new Set([]),
      headers
    })

    expect(wrapper.findAll('tr').length).toBe(1)

    await wrapper.setProps({ expanded: new Set([1]) })

    expect(wrapper.findAll('tr').length).toBe(2)
  })

  it('cell count', () => {
    const headers = [
      {
        label: '',
        key: 'name'
      },
      {
        label: '',
        key: 'email'
      },
      {
        label: '',
        key: 'isActive'
      }
    ]

    const wrapper = createWrapper({
      user: createUserNode({ id: 1, parentId: 0 }),
      expanded: new Set([]),
      headers
    })

    expect(wrapper.findAll('td').length).toBe(headers.length)
  })
})
