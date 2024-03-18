<template>
  <q-table
    class=" my-sticky-dynamic"
    style="height: calc(100vh - 100px)"
    flat
    :title="$t('menu.transaction')"
    bordered
    dense
    :dark="$q.dark.isActive"
    :rows="records"
    :columns="columns"
    row-key="time"
    :rows-per-page-options="[0]"
  >
  </q-table>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useFetchData from 'src/composables/useFetchData'
//
const { t } = useI18n()

const { getMyTransactions } = useFetchData()
const { result } = getMyTransactions()

const records = computed(() => {
  return result.value?.getAllTx
})

const columns = [
  {
    name: 'amount',
    label: t('amount'),
    align: 'center',
    field: 'amount',
    sortable: true
  },
  {
    name: 'credit',
    label: t('credit'),
    align: 'center',
    field: 'credit'
  },
  {
    name: 'debit',
    label: t('debit'),
    align: 'center',
    field: 'debit'
  },
  {
    name: 'sign',
    label: t('sign'),
    align: 'center',
    field: 'sign'
  },
  {
    name: 'hash',
    label: t('hash'),
    align: 'center',
    field: 'hash'
  },
  {
    name: 'time',
    label: t('time'),
    align: 'right',
    field: 'time',
    sortable: true
  }
]
</script>
