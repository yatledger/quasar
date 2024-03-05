<template>
  <div class="q-pa-md">
    <q-table
      title="Транзакции"
      :rows="records"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script setup>
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
