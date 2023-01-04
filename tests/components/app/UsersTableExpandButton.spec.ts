import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconMinus from '@/components/icon/Minus.vue'
import IconPlus from '@/components/icon/Plus.vue'
import UiButton from '@/components/ui/Button.vue'
import AppUsersTableExpandButton from '@/components/app/UsersTableExpandButton.vue'

describe('UsersTableExpandButton', () => {
  it('expanded/collapsed button state', async () => {
    const wrapper = mount(AppUsersTableExpandButton, {
      components: {
        IconPlus,
        IconMinus,
        UiButton,
      },
      props: {
        expanded: true
      }
    })

    expect(wrapper.findComponent(IconMinus).exists()).toBe(true)
    expect(wrapper.findComponent(IconPlus).exists()).toBe(false)
    expect(wrapper.text()).toBe('collapse')

    await wrapper.setProps({ expanded: false })

    expect(wrapper.findComponent(IconMinus).exists()).toBe(false)
    expect(wrapper.findComponent(IconPlus).exists()).toBe(true)
    expect(wrapper.text()).toBe('expand')
  })
})
