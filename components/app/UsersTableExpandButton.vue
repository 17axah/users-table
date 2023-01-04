<script lang="ts" setup>
interface Props {
  expanded: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <ui-button v-bind="$attrs" dense block>
    <template #icon>
      <icon-minus v-if="expanded" />
      <icon-plus v-else />
    </template>
    {{ expanded ? 'collapse' : 'expand' }}
  </ui-button>
</template>
