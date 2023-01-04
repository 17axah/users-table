<script lang="ts" setup>
type ModelValue = string | number

interface Props {
  modelValue: ModelValue
  label: string
  type?: string
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label class="ui-input">
    <span class="ui-input__label">
      {{ label }}
    </span>

    <input
      v-bind="$attrs"
      v-model="model"
      :type="type"
      class="ui-input__field"
    >
  </label>
</template>

<style lang="sass" scoped>
@use 'assets/styles/variables' as *

.ui-input
  &__label
    display: inline-block
    margin-bottom: 2px

  &__field
    display: block
    width: 100%
    padding: 8px 12px
    border: 1px solid $color-grey-lighten-1
    border-radius: 4px
    background: $color-white
    outline: none
    transition: border 0.2s

    &:hover
      border-color: $color-grey-darken-1

    &:focus
      border-color: $color-primary
</style>
