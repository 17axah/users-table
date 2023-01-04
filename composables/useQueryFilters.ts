export function useQueryFilters<T extends Record<string, any>>() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<T>({
    get() {
      const { filters } = route.query

      return filters ? JSON.parse(filters as string) : {}
    },
    set(values: T) {
      const { filters, ...rest } = route.query

      const query = Object.keys(values || {}).length
        ? { ...rest, filters: JSON.stringify(values) }
        : rest

      router.push({
        ...route,
        query
      })
    }
  })

  return {
    filters
  }
}
