<script lang="ts" setup>
import { UserNode } from '@/types';

interface Props {
  users: UserNode[]
}

const props = defineProps<Props>()

const headers = [
  {
    label: '',
    key: 'controls',
    style: 'width: 120px',
  },
  {
    label: 'id',
    key: 'id',
  },
  {
    label: 'name',
    key: 'name',
  },
  {
    label: 'email',
    key: 'email',
  },
  {
    label: 'balance',
    key: 'balance',
  },
  {
    label: 'isActive',
    key: 'isActive',
    class: 'text-center',
  },
]

const expanded = reactive(new Set<number>())

function toggle(id: number) {
  expanded.has(id) ? expanded.delete(id) : expanded.add(id)
}
</script>

<template>
  <div class="users-table">
    <ui-table class="users-table__table">
      <template #head>
        <ui-table-row head>
          <ui-table-cell
            v-for="header in headers"
            :key="header.key"
            head
            :style="header.style"
            :class="header.class"
          >
            {{ header.label }}
          </ui-table-cell>
        </ui-table-row>
      </template>

      <template v-if="users.length" #body>
        <app-users-table-row
          v-for="user in users"
          :key="user.id"
          :headers="headers"
          :expanded="expanded"
          :user="user"
        >
          <template #controls="{ id, children }">
            <app-users-table-expand-button
              v-if="children && children.length"
              :expanded="expanded.has(id)"
              @click="toggle(id)"
            />
          </template>

          <template #isActive="{ isActive }">
            <app-users-table-status :active="isActive" />
          </template>
        </app-users-table-row>
      </template>

      <template v-else #prepend-body>
        <ui-table-row>
          <ui-table-cell colspan="100%" class="text-center">
            no data available
          </ui-table-cell>
        </ui-table-row>
      </template>
    </ui-table>
  </div>
</template>

<style lang="sass" scoped>
.users-table
  overflow: auto

  &__table
    min-width: 700px
</style>
