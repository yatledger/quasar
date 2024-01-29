<script setup>
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const { data } = useQuery(gql`
  query getTx {
    tx (
        amount: -1000,
        skip: 25,
        limit: 5
      ) {
      amount
      credit
      debit
      msg
      time
    }
  }
`)

console.log(data)
</script>

<template>
  <q-page class="flex flex-center" v-if="data">
    <div v-for="tx in data.tx" :key="tx.time">
      <p>{{ tx.amount }} {{ tx.credit }} {{ tx.debit }} {{ tx.msg }} {{ tx.time }}</p>
    </div>
  </q-page>
</template>
