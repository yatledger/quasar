<template>
  <h5>Транзакции</h5>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>time</th>
          <th>debit</th>
          <th>credit</th>
          <th>amount</th>
          <th>sign</th>
          <th>msg</th>
          <th>hash</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, idx) of records" :key="record.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ record.time }}</td>
          <td>{{ record.debit }}</td>
          <td>{{ record.credit }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.sign }}</td>
          <td>{{ record.msg }}</td>
          <td>{{ record.hash }}</td>

        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import useFetchData from 'src/composables/useFetchData'
import { computed } from 'vue'
const { getAllUserTransactions } = useFetchData()

const { result } = getAllUserTransactions()
const records = computed(() => {
  return result.value?.getAllTx
})
</script>
