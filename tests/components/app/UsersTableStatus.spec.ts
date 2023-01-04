import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiDot from '@/components/ui/Dot.vue'
import AppUsersTableStatus from '@/components/app/UsersTableStatus.vue'

describe('UsersTableStatus', () => {
  it('status classes', async () => {
    const wrapper = mount(AppUsersTableStatus, {
      components: {
        UiDot
      },
      props: {
        active: true
      }
    })

    expect(wrapper.classes('text-success')).toBe(true)
    expect(wrapper.classes('text-error')).toBe(false)

    await wrapper.setProps({ active: false })

    expect(wrapper.classes('text-success')).toBe(false)
    expect(wrapper.classes('text-error')).toBe(true)
  })
})
