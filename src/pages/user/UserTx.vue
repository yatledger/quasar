<template>
  <div style="width: 100%; overflow: hidden">
    <h1>Транзакции</h1>
    <ul>
      <li v-for="tx in txs" :key="tx.time">
        <span v-if="tx.credit == pub">
          {{ tx.amount }}&nbsp;→&nbsp;<router-link :to="{ name: 'user', params: { id: tx.debit } }">{{ tx.debit.substr(0,
            25) }}&hellip;</router-link><span v-if="tx.msg"> ({{ tx.msg }})</span>
        </span>
        <span v-if="tx.debit == pub">
          <router-link :to="{ name: 'user', params: { id: tx.credit } }">{{ tx.credit.substr(0, 25)
          }}&hellip;</router-link>&nbsp;→&nbsp;{{ tx.amount }}<span v-if="tx.msg"> ({{ tx.msg }})</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import ky from 'ky'

export default {
  data: () => ({
    txs: []
  }),
  computed: {
    // eslint-disable-next-line space-before-function-paren
    pub() {
      return this.$store.state.pub
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    if (this.pub) { this.txs = await ky.get(import.meta.env.VITE_REST_SERVER + 'tx/' + this.pub).json() }
  }
}
</script>
