<template>
  <div align="center" justify="center" style="margin-top: 10vh;">
    <h1 :style="bStyles">{{ balance }} ѣ</h1>
    <div class="row justify-between" style="margin-bottom: 4vh;">
      <q-btn :to="{ path: '/get' }" label="Получить" color="primary"></q-btn>
      <q-btn :to="{ path: '/put' }" label="вложить" color="primary"></q-btn>
    </div>
    <figure class="qrcode">
      <vue-qrcode :value=url
        :options="{ width: 250, color: { dark: '#3e007a', light: '#ffffff', }, errorCorrectionLevel: 'M' }"></vue-qrcode>
      <img class="qrcode__image" src="../assets/icon-qr.png" />
    </figure>
    <br /><br />
    <q-btn elevation="2" @click="refresh" icon="refresh" color="primary" round size="md"></q-btn>&nbsp;
    <q-btn elevation="2" @click="copy" icon="content_copy" color="primary" round size="md"></q-btn>&nbsp;
    <q-btn elevation="2" :href="tg" icon="telegram" color="primary" round size="md"></q-btn>&nbsp;
  </div>
</template>

<script>
import vueQrcode from '@chenfengyuan/vue-qrcode'
// @ is an alias to /src
export default {
  components: {
    vueQrcode
  },
  data: () => ({

  }),
  computed: {
    // eslint-disable-next-line space-before-function-paren
    pub() {
      return 123
      // return this.$store.state.pub
    },
    // eslint-disable-next-line space-before-function-paren
    url() {
      return import.meta.env.VITE_HTTP_SERVER + 'user/' + this.pub
    },
    // eslint-disable-next-line space-before-function-paren
    balance() {
      return 123
      // return this.$store.state.balance
    },
    // eslint-disable-next-line space-before-function-paren
    tg() {
      return `tg://msg_url?url=${this.url}&text=Отправь мне Ятѣ`
    },
    // eslint-disable-next-line space-before-function-paren
    bStyles() {
      return { 'font-size': '10vh' }
      // return { 'font-size': this.$store.state.size + 'vh' }
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    // if (this.pub) {
    //   const rest = import.meta.env.VITE_REST_SERVER + 'balance/' + this.pub
    //   let b = 0
    //   let s = 0;
    //   [b, s] = await this.$fetch.balance(rest)
    //   this.$store.commit('setbal', b)
    //   this.$store.commit('setsize', s)
    // }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    async refresh() {
      // const rest = import.meta.env.VITE_REST_SERVER + 'balance/' + this.pub
      // let b = 0
      // let s = 0;
      // [b, s] = await this.$fetch.balance(rest)
      // this.$store.commit('setbal', b)
      // this.$store.commit('setsize', s)
    },
    // eslint-disable-next-line space-before-function-paren
    copy() {
      this.$copyText(this.url).then((e) => {
        console.log(e)
        this.$q.notify({ text: 'Адрес скопирован', type: 'success', position: 'top' })
      }, (e) => {
        console.log(e)
        this.$q.notify({ text: 'Не могу скопировать адрес', type: 'warn', position: 'top' })
      })
    }
  }
}
</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

.qrcode__image {
  height: 48px;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
}
</style>
