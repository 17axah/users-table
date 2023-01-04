<script lang="ts" setup>
const { arrayToTree, filterTree } = useTree()
const { filters } = useQueryFilters()

const data = await $fetch('/api/users')
const tree = computed(() => arrayToTree(data))
const users = computed(() => filterTree(tree.value, filters.value))
</script>

<template>
  <main class="pv-40">
    <ui-wrapper>
      <app-users-filters v-model="filters" class="mb-20" />
      <app-users-table :users="users" />
    </ui-wrapper>
  </main>
</template>
