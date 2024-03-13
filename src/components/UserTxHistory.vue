<template>
  <div class="q-pa-md">
    <q-table
      :title="$t('menu.transaction')"
      :rows="records"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script setup>
defineOptions({
  name: 'UserTxHistory'
})

defineProps({
  records: {
    required: true,
    type: Array
  },
  columns: {
    required: true,
    type: Array
  }
})
</script>
