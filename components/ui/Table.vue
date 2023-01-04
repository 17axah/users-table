<template>
  <table class="ui-table">
    <thead v-if="$slots.head" class="ui-table__head">
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="prepend-body" />
      <slot name="body" />
    </tbody>
  </table>
</template>

<style lang="sass" scoped>
.ui-table
  width: 100%
  border-collapse: collapse

  &__head
    text-align: left
</style>
