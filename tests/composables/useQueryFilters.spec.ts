import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useQueryFilters } from '@/composables/useQueryFilters'

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')

  const router = {
    currentRoute: reactive({ query: {} }),
    push(params: any) {
      this.currentRoute.query = params.query
    }
  }

  return {
    ...actual as {},
    useRoute: () => router.currentRoute,
    useRouter: () => router
  }
});

beforeEach(() => {
  const router = useRouter()

  router.push({ query: {} })
})

describe('filters', () => {
  it('query filters', () => {
    const { filters } = useQueryFilters()
    const route = useRoute()

    filters.value = { name: 'xxx' }

    expect(route.query).toStrictEqual({ filters: JSON.stringify({ name: 'xxx' }) })
  })

  it('reset filters', () => {
    const { filters } = useQueryFilters()
    const route = useRoute()

    filters.value = { name: 'xxx' }

    expect(route.query).toStrictEqual({ filters: JSON.stringify({ name: 'xxx' }) })

    filters.value = {}

    expect(route.query).toStrictEqual({})
  })

  it('filters with existing query', () => {
    const { filters } = useQueryFilters()
    const router = useRouter()
    const route = useRoute()

    router.push({ ...route, query: { name: 'Joe' } })

    filters.value = { name: 'xxx' }

    expect(route.query).toStrictEqual({ name: 'Joe', filters: JSON.stringify({ name: 'xxx' }) })

    filters.value = {}

    expect(route.query).toStrictEqual({ name: 'Joe' })
  })
})
