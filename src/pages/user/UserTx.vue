<template>
  <h5>Транзакции</h5>
  <section>
    <UserHistoryTx :records="records" />
  </section>
</template>

<script>
import UserHistoryTx from '../../components/UserTxHistory.vue'

export default {
  name: 'UserTx',
  data: () => ({
    records: [
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 999.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 21140.25,
        type: 'Withdrawal'
      },
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 9919.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 140.25,
        type: 'Withdrawal'
      },
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 467.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 9812,
        type: 'Withdrawal'
      },
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 999.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 21140.25,
        type: 'Withdrawal'
      },
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 999.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 21140.25,
        type: 'Withdrawal'
      },
      {
        date: '21.01.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 999.01,
        type: 'Deposit'
      },
      {
        date: '21.02.2024',
        walletFrom: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        walletTo: 'BvF9EUZntQZBsQmKCadDc8XmarSdLGdRS3LGJuUUsSqv',
        ammount: 21140.25,
        type: 'Withdrawal'
      }
    ]
  }),
  components: {
    UserHistoryTx
  }
}
</script>
