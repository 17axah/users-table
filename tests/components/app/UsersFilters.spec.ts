import { Ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from '@/components/ui/Input.vue'
import UiSelect from '@/components/ui/Select.vue'
import UiButton from '@/components/ui/Button.vue'
import AppUsersFilters from '@/components/app/UsersFilters.vue'

function createWrapper(filters: Ref<any>) {
  return mount(AppUsersFilters, {
    components: {
      IconClose: { template: '<svg />' },
      IconFilter: { template: '<svg />' },
      UiInput,
      UiSelect,
      UiButton
    },
    props: {
      modelValue: filters.value,
      'onUpdate:modelValue': (value: any) => (filters.value = value)
    }
  })
}

describe('UsersFilters', () => {
  it('filling filters', async () => {
    const filters = ref({})
    const wrapper = createWrapper(filters)
    const form = wrapper.find('form')
    const inputEmail = wrapper.find('input[type=email]')
    const inputBalance = wrapper.find('input[type=text]')
    const selectIsActive = wrapper.find('select')

    await Promise.all([
      inputEmail.setValue('kirkorov@mail.com'),
      inputBalance.setValue("100"),
      selectIsActive.setValue(true)
    ])

    await form.trigger('submit')

    expect(filters.value).toStrictEqual({
      email: 'kirkorov@mail.com',
      balance: "100",
      isActive: true
    })
  })

  it('reset button visibility', async () => {
    const wrapper = createWrapper(ref({}))
    const inputEmail = wrapper.find('input[type=email]')

    expect(wrapper.find('button[type=reset]').exists()).toBe(false)

    await inputEmail.setValue('kirkorov@mail.com')

    expect(wrapper.find('button[type=reset]').exists()).toBe(true)

    await inputEmail.setValue('')
  })

  it('submit button disabling', async () => {
    const wrapper = createWrapper(ref({}))
    const inputEmail = wrapper.find('input[type=email]')
    const buttonSubmit = wrapper.find('button[type=submit]')

    expect(buttonSubmit.attributes('disabled')).toBe('')

    await inputEmail.setValue('kirkorov@mail.com')

    expect(buttonSubmit.attributes('disabled')).toBeUndefined()
  })

  it('with initial values', () => {
    const filters = ref({
      email: 'kirkorov@mail.com',
      balance: '100',
      isActive: false
    })

    const wrapper = createWrapper(filters)
    const inputEmail = wrapper.find('input[type=email]')
    const inputBalance = wrapper.find('input[type=text]')
    const selectIsActive = wrapper.find('select')

    expect((inputEmail.element as HTMLInputElement).value).toBe('kirkorov@mail.com')
    expect((inputBalance.element as HTMLInputElement).value).toBe('100')
    expect((selectIsActive.element as HTMLSelectElement).value).toBe('false')
  })
})
