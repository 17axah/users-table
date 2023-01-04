<script lang="ts" setup>
interface Props {
  active: boolean
}

const props = defineProps<Props>()

const classes = computed(() => ({
  'text-success': props.active,
  'text-error': !props.active,
}))
</script>

<template>
  <ui-dot :class="classes" />
</template>
