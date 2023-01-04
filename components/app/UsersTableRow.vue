<script lang="ts" setup>
import { UserNode } from '@/types'

interface Header {
  label: string
  key: string
  class?: any
  style?: any
}

interface Props {
  user: UserNode
  headers: Header[]
  expanded: Set<number>
}

const props = defineProps<Props>()
</script>

<template>
  <ui-table-row>
    <ui-table-cell
      v-for="header in headers"
      :key="header.key"
      :style="header.style"
      :class="header.class"
    >
      <slot v-bind="user" :name="header.key">
        {{ user[header.key as keyof UserNode] }}
      </slot>
    </ui-table-cell>
  </ui-table-row>

  <template v-if="expanded.has(user.id)">
    <app-users-table-row
      v-for="child in user.children"
      :user="child"
      :headers="headers"
      :expanded="expanded"
    >
      <template
        v-for="(_, name) in $slots"
        v-slot:[name]="scope: UserNode"
      >
        <slot v-bind="scope" :name="name" />
      </template>
    </app-users-table-row>
  </template>
</template>
