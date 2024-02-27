<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const initialTransactions = [
  {
    fromUser: {
      id: 1,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 2,
      name: 'Bob',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025, // Биткоины, например
    credit: 'BTC',
    debit: 'ETH',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:00'
  },
  {
    fromUser: {
      id: 3,
      name: 'Charlie',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 4,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    credit: 'ETH',
    debit: 'BTC',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:00'
  }
]

const { data, error } = useQuery(gql`
query getTx {
    tx(amount: -1000, skip: 25, limit: 15) {
      amount
      credit
      debit
      msg
      time
      fromUser {
        avatar
      }
      toUser {
        avatar
      }
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
    name: 'avatars',
    label: 'Avatars',
    align: 'left',
    field: 'avatars'
  },
  {
    name: 'amount',
    label: 'Amount',
    align: 'left',
    field: 'amount',
    sortable: true,
    format: (val) => Math.round(val).toString() // Преобразование в целое число
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
    sortable: true,
    format: (val) => new Date(val).toLocaleString('en-US', { month: 'short', year: 'numeric' })
  }
]
</script>

<template>
  <div class="q-pa-md my-padding">
    <q-table class=" my-sticky-dynamic" style="height: calc(100vh - 100px)" flat bordered title="Транзакции"
      :rows="transactions" :columns="columns" row-key="time">
      <template v-slot:body-cell-avatars="props">
        <q-avatar>
          <img :src="'https://cdn.quasar.dev/img/avatar.png'" alt="from"
            style="width: 20px; height: 20px; border-radius: 50%;">
        </q-avatar>
        <q-avatar>
          <img :src="'/assets/' + props.row.toUser.avatar" alt="to"
            style="width: 20px; height: 20px; border-radius: 50%;">
        </q-avatar>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
.my-sticky-dynamic
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $dark

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px

  .my-padding
  @media (max-width: $breakpoint-sm-max)
    padding-left: 0 !important
    padding-right: 0 !important
</style>
