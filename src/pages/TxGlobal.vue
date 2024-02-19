<template>
  <div style="width: 100%; overflow: hidden">
    <h1>История</h1>
    <ul>
      <li v-for="tx in txs" :key="tx.time">
        <router-link :to="{ name: 'user', params: { id: tx.credit } }">{{ tx.credit.substr(0, 25)
        }}&hellip;</router-link>&nbsp;→&nbsp;<router-link :to="{ name: 'user', params: { id: tx.debit } }">{{
  tx.debit.substr(0, 25) }}&hellip;</router-link>&nbsp;→&nbsp;{{ tx.amount }}<span v-if="tx.msg"> ({{ tx.msg
  }})</span>
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
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    this.txs = await await ky.get(import.meta.env.VITE_REST_SERVER + 'tx').json()
  }
}
</script>
