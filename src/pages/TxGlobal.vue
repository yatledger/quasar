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
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:19'
  },
  {
    fromUser: {
      id: 3,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 4,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:18'
  },
  {
    fromUser: {
      id: 12,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 22,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:17'
  },
  {
    fromUser: {
      id: 32,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 42,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:16'
  },
  {
    fromUser: {
      id: 13,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 23,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:15'
  },
  {
    fromUser: {
      id: 33,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 43,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:14'
  },
  {
    fromUser: {
      id: 14,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 24,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:13'
  },
  {
    fromUser: {
      id: 34,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 44,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:12'
  },
  {
    fromUser: {
      id: 15,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 25,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:11'
  },
  {
    fromUser: {
      id: 36,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 46,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:10'
  },
  {
    fromUser: {
      id: 17,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 27,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:09'
  },
  {
    fromUser: {
      id: 38,
      name: 'Charlie',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_C'
    },
    toUser: {
      id: 48,
      name: 'David',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_D'
    },
    amount: 1.5, // Эфириумы, например
    ticket: 'YAT',
    msg: 'Product purchase',
    time: '2024-02-19T14:45:08'
  },
  {
    fromUser: {
      id: 171,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 271,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:07'
  },
  {
    fromUser: {
      id: 172,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 272,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:06'
  },
  {
    fromUser: {
      id: 173,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 273,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:05'
  },
  {
    fromUser: {
      id: 174,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 274,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:04'
  },
  {
    fromUser: {
      id: 175,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 275,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:03'
  },
  {
    fromUser: {
      id: 176,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 276,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:02'
  },
  {
    fromUser: {
      id: 177,
      name: 'Alice',
      avatar: 'yatb-s1.png',
      wallet: 'wallet_A'
    },
    toUser: {
      id: 277,
      name: 'Bob',
      avatar: 'icon-144x144.png',
      wallet: 'wallet_B'
    },
    amount: 0.0025,
    ticket: 'YAT',
    msg: 'Payment for services',
    time: '2024-02-19T12:30:01'
  }
]

const { data, error } = useQuery(gql`
query getTx {
    tx(amount: -1000, skip: 25, limit: 15) {
      amount
      ticket
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
const getAvatarUrl = (avatar) => `src/assets/${avatar}`

// Заполняем массив транзакций данными из запроса GraphQL
if (data && data.tx) {
  transactions.value = data.tx
}

const columns = [
  {
    name: 'fromUserAvatars',
    label: 'From',
    align: 'left',
    field: 'fromUser.avatar'
  },
  {
    name: 'amount',
    label: 'Amount',
    align: 'center',
    field: 'amount',
    sortable: true,
    format: (val) => Math.round(val).toString() // Преобразование в целое число
  },
  {
    name: 'toUserAvatars',
    label: 'To',
    align: 'center',
    field: 'toUser.avatar'
  },
  {
    name: 'Ticket',
    label: 'Ticket',
    align: 'center',
    field: 'ticket'
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
    <q-table class=" my-sticky-dynamic" style="height: calc(100vh - 100px)" flat bordered dense dark title="Транзакции"
      :rows="transactions" :columns="columns" row-key="time" :rows-per-page-options="[10, 15, 20, 25, 50, 0]">
      <template v-slot:body-cell-fromUserAvatars="props">
        <q-td :props="props">
          <q-avatar>
            <img v-if="props.col.field === 'fromUser.avatar'" :src="getAvatarUrl(props.row.fromUser.avatar)" alt="from"
              style="max-width: 40px; max-height: 40px; border-radius: 50%;">
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-toUserAvatars="props">
        <q-td :props="props">
          <q-avatar>
            <img v-if="props.col.field === 'toUser.avatar'" :src="getAvatarUrl(props.row.toUser.avatar)" alt="to"
              style="max-width: 40px; max-height: 40px; border-radius: 50%;">
          </q-avatar>
        </q-td>
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
