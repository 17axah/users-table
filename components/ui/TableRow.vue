<script lang="ts" setup>
interface Props {
  head?: boolean
}

const props = defineProps<Props>()

const classes = computed(() => ({
  'ui-table-row--head': props.head,
  'ui-table-row--body': !props.head,
}))
</script>

<template>
  <tr v-bind="$attrs" class="ui-table-row" :class="classes">
    <slot />
  </tr>
</template>

<style lang="sass" scoped>
@use 'assets/styles/variables' as *

.ui-table-row
  &--head
    background-color: $color-grey-lighten-2
    font-weight: 600
    color: $color-grey-darken-2

  &--body
    background-color: $color-white
    color: $color-grey-darken-1
</style>
