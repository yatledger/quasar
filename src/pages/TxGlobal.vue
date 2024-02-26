<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const initialTransactions = [
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:01:00Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:00Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:02:01Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:01Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:11:00Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:02Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:01Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:03Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:02Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:03Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:04Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:04Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:05Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:05Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:06Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:06Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:07Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:07Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:08Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:09Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:08Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:10Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:09Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:11Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:12Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:10Z'
  },
  {
    amount: 100,
    credit: 'Some Credit',
    debit: 'Some Debit',
    msg: 'Some Message',
    time: '2022-02-20T12:00:13Z'
  },
  {
    amount: -50,
    credit: 'Another Credit',
    debit: 'Another Debit',
    msg: 'Another Message',
    time: '2022-02-20T12:15:11Z'
  }
]

const { data, error } = useQuery(gql`
  query getTx {
    tx(amount: -1000, skip: 25, limit: 5) {
      amount
      credit
      debit
      msg
      time
    }
  }
`)
if (error) {
  console.error('Ошибка при получении данных:', error.message)
}

const transactions = ref(initialTransactions)

// Заполняем массив транзакций данными из запроса GraphQL
if (data && data.tx) {
  transactions.value = data.tx
}

const columns = [
  {
    name: 'amount',
    label: 'Amount',
    align: 'left',
    field: 'amount',
    sortable: true
  },
  {
    name: 'credit',
    label: 'Credit',
    align: 'center',
    field: 'credit',
    sortable: true
  },
  {
    name: 'debit',
    label: 'Debit',
    align: 'right',
    field: 'debit',
    sortable: true
  },
  {
    name: 'msg',
    label: 'Message',
    align: 'right',
    field: 'msg',
    sortable: true
  },
  {
    name: 'time',
    label: 'Time',
    align: 'right',
    field: 'time',
    sortable: true
  }
]
</script>

<template>
  <div class="q-pa-md">
    <q-table
      style="height: calc(100vh - 100px)"
      flat
      bordered
      title="Транзакции"
      :rows="transactions"
      :columns="columns"
      row-key="time"
      :rows-per-page-options="[0]"
    >
    </q-table>
  </div>
</template>
