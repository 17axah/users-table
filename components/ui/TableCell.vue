<script lang="ts" setup>
interface Props {
  head?: boolean
}

const props = defineProps<Props>()
const tag = computed(() => props.head ? 'th' : 'td')
</script>

<template>
  <component
    v-bind="$attrs"
    :is="tag"
    class="ui-table-cell"
  >
    <slot />
  </component>
</template>

<style lang="sass" scoped>
@use 'assets/styles/variables' as *

.ui-table-cell
  padding: 8px 12px
  border: 1px solid $color-grey-lighten-1
</style>
