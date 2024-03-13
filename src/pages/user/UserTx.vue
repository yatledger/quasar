<template>
  <section>
    <UserHistoryTx :records="records" :columns="columns"/>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import UserHistoryTx from 'components/UserTxHistory.vue'

defineOptions({
  name: 'UserTx'
})
const columns = ref([
  {
    name: 'date',
    required: true,
    label: 'Дата',
    align: 'left',
    field: 'date',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'walletFrom',
    align: 'center',
    label: 'От кого',
    field: 'walletFrom',
    sortable: true
  },
  {
    name: 'walletTo',
    align: 'center',
    label: 'Куда',
    field: 'walletTo',
    sortable: true
  },
  {
    name: 'amount',
    label: 'Сумма',
    field: 'amount',
    sortable: true
  },
  {
    name: 'type',
    label: 'Тип',
    field: 'type',
    sortable: true
  }
])

const records = ref([
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 999.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 21140.25,
    type: 'Withdrawal'
  },
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 9919.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 140.25,
    type: 'Withdrawal'
  },
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 467.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 9812,
    type: 'Withdrawal'
  },
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 999.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 21140.25,
    type: 'Withdrawal'
  },
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 999.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 21140.25,
    type: 'Withdrawal'
  },
  {
    date: '21.01.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 999.01,
    type: 'Deposit'
  },
  {
    date: '21.02.2024',
    walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
    amount: 21140.25,
    type: 'Withdrawal'
  }
])
</script>
