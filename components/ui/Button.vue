<script lang="ts" setup>
interface Props {
  dense?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
})

const classes = computed(() => ({
  'ui-button--dense': props.dense,
  'ui-button--block': props.block
}))
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    class="ui-button"
    :class="classes"
  >
    <span v-if="$slots.icon" class="ui-button__icon">
      <slot name="icon" />
    </span>

    <slot />
  </button>
</template>

<style lang="sass" scoped>
@use 'assets/styles/variables' as *

.ui-button
  display: inline-flex
  align-items: center
  justify-content: center
  border: none
  padding: 8px 12px
  background: none
  cursor: pointer
  color: $color-white
  background-color: $color-primary
  border-radius: 4px
  font-size: 14px
  line-height: 17px
  -webkit-tap-highlight-color: transparent
  transition: background 0.2s, opacity 0.2s, transform 0.2s

  &:disabled
    background-color: $color-grey
    cursor: not-allowed

  &:not(&:disabled):hover
    opacity: 0.85

  &:not(&:disabled):active
    transform: scale(0.985)

  &__icon
    display: block
    margin-right: 8px

    :deep(svg)
      display: block

  &--dense
    padding: 6px 10px
    font-size: 12px
    line-height: 15px

  &--block
    width: 100%
    display: flex
</style>
