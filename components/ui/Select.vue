<script lang="ts" setup>
type ModelValue = any

interface Option {
  value: ModelValue
  label: string
}

interface Props {
  modelValue: ModelValue
  label: string
  options: Option[]
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

const props = defineProps<Props>()

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
  <label class="ui-select">
    <span class="ui-select__label">{{ label }}</span>

    <select v-model="model" class="ui-select__field">
      <option value="">Choose</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style lang="sass" scoped>
@use 'assets/styles/variables' as *

.ui-select
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

