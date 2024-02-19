<template>
  <div style="width:100%">
    <h1>Вложить</h1>
    <q-card v-for="user in users" :key="user.addr" style="margin-bottom: 2.5vh;">
      <v-img :src="user.cover" cover></v-img>
      <q-card-title>{{ user.name }}</q-card-title>
      <!--<v-card-subtitle>1,000 miles of wonder</v-card-subtitle>-->
      <q-card-actions>
        <q-btn color="secondary" rounded variant="contained-text" :to="{ name: 'user', params: { id: user.addr } }"
          label="Подписаться"></q-btn>
        <q-btn :icon="show[user.addr] ? 'chevron_up' : 'chevron_down'" @click="sh(user.addr)"></q-btn>
      </q-card-actions>
      <!-- <v-expand-transition>
        <div v-show="show[user.addr]">
          <v-divider></v-divider>
          <v-card-text class="raw_txt" v-html="user.desc"></v-card-text>
        </div>
      </v-expand-transition> -->
    </q-card>
  </div>
</template>

<script>
import ky from 'ky'

export default {
  data: () => ({
    show: [],
    users: []
  }),
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    this.users = await ky.get(import.meta.env.VITE_REST_SERVER + 'users').json()
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    sh(addr) {
      this.show[addr] = !this.show[addr]
    }
  }
}
</script>
