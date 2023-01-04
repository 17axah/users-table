<script lang="ts" setup>
import { User } from '@/types';

interface Filters {
  isActive: User['isActive'] | '',
  email: User['email'] | '',
  balance: User['balance'] | '',
}

type ModelValue = Partial<Filters>

interface Props {
  modelValue: ModelValue
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

const initialValues: Filters = {
  isActive: '',
  email: '',
  balance: ''
}

const activeOptions = [
  {
    value: true,
    label: 'Active'
  },
  {
    value: false,
    label: 'Not active'
  },
]

const filters = computed({
  get() {
    return props.modelValue
  },
  set(values) {
    const entries = Object.entries(values).filter(([key, value]) => value !== '')

    emit('update:modelValue', Object.fromEntries(entries))
  }
})

const values = ref({ ...initialValues, ...filters.value })
const hasValue = computed(() => Object.values(values.value).some((value) => value !== ''))
const hasFilter = computed(() => !!Object.keys(filters.value).length)

function submit() {
  filters.value = values.value
}

function reset() {
  values.value = { ...initialValues }
  filters.value = {}
}
</script>

<template>
  <form class="row gutter-5 items-flex-end" @submit.prevent="submit">
    <div class="col-12 col-md-9">
      <div class="row gutter-5 items-flex-end">
        <div class="col-12 col-md-4 pb-10 pb-md-0">
          <ui-input v-model="values.email" type="email" label="Email" />
        </div>
        <div class="col-12 col-md-4 pb-10 pb-md-0">
          <ui-input v-model="values.balance" type="text" label="Balance" />
        </div>
        <div class="col-12 col-md-4 pb-10 pb-md-0">
          <ui-select v-model="values.isActive" label="isActive" :options="activeOptions" />
        </div>
      </div>
    </div>
    <div class="col-12 col-md-3">
      <div class="row gutter-5">
        <div class="col-6">
          <ui-button v-if="hasValue || hasFilter" block type="reset" @click.prevent="reset">
            <template #icon>
              <icon-close />
            </template>
            Reset
          </ui-button>
        </div>
        <div class="col-6">
          <ui-button block :disabled="!hasValue" type="submit">
            <template #icon>
              <icon-filter />
            </template>
            Filter
          </ui-button>
        </div>
      </div>
    </div>
  </form>
</template>
