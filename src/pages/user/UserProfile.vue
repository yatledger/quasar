<template>
  <div style="width:98%; margin: 0 auto">
    <div>
      <h1 v-if="name">{{ name }}</h1>
      <img :src="cover" style="max-width: 100%;" />
      <p v-if="desc" class="raw_txt" v-html="desc"></p>
    </div>
    <h1>Настройки</h1>
    <q-input v-model="name" label="Имя" placeholder="На балансе должно быть более 100ѣ" />

    <q-file outlined counter v-model="file" label="Добавьте обложку (500ѣ)" @change="i2b" :rules="rules"
      accept="image/png, image/jpeg" hint="На балансе должно быть более 500ѣ">
      <template v-slot:prepend>
        <q-icon name="camera" />
      </template>
    </q-file>

    <q-input v-model="desc" filled type="textarea" label="Описание" no-resize outlined hint="Для хранения описания
    держите на балансе более 250ѣ" />

    <div class="row">
      <q-btn @click="save" label="сохранить" color="primary"></q-btn>
    </div>
    <br />
    <p class="text-purple-4"><small>
        <q-icon name="exclamation_thick"></q-icon>
        Для тюнинга страницы ваш баланс должен быть положительным: 100ѣ публикация имени; 250ѣ внесение описания; 500ѣ
        размещение обложки. Сумма не снимается, а хранится в качестве депозита.<br />
        «Секретный ключ» — это ваше всё!!! В случае утери, восстановить его не получиться!! Внимательно позаботьтесь о
        его
        сохранности перед тем, как начать активно пользоваться Ятѣ!
      </small></p>
    <h2>Секретный ключ
      <q-icon name="refresh" @click="gen"></q-icon>
      <q-icon name="content_copy" @click="copySec"></q-icon>
    </h2>
    <q-input v-model="seed" filled type="textarea" label="Описание" outlined />

    <h2>Адрес:</h2>
    <p>{{ pub }}
      <q-icon name="content_copy" @click="copyPub"></q-icon>
    </p>
  </div>
</template>
<script>
// import ky from 'ky'
export default {
  data: () => ({
    rules: [
      value => {
        return !value || !value.length || value[0].size < 2000000 || 'Размер обложки не должен превышать 2 MB!'
      }
    ],
    name: '',
    desc: '',
    file: [],
    cover: '',
    info: []
  }),
  computed: {
    seed: {
      // eslint-disable-next-line space-before-function-paren
      get() {
        return 123
        // return this.$store.state.seed
      },
      // eslint-disable-next-line space-before-function-paren
      async set(seed) {
        console.log(seed)
        //   const [sec, pub] = await this.$crypt.recKey(seed)
        //   if (seed.length > 64) {
        //     seed = seed.substr(0, 64) // legacy
        //   }
        //   this.$db.set('settings', 'seed', seed)
        //   this.$db.set('settings', 'pub', pub)
        //   this.$db.set('settings', 'sec', sec)
        //   this.$store.commit('setseed', seed)
        //   this.$store.commit('setsec', sec)
        //   this.$store.commit('setpub', pub)
        // }
      },
      // eslint-disable-next-line space-before-function-paren
      pub() {
        // return this.$store.state.pub
      },
      // eslint-disable-next-line space-before-function-paren
      sec() {
        // return this.$store.state.sec
      }
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    // if (this.pub) { this.info = await ky.get(import.meta.env.VITE_REST_SERVER + 'user/' + this.pub).json() }
    // if (this.info) {
    //   if (this.info.name) { this.name = this.info.name }
    //   if (this.info.desc) { this.desc = this.info.desc }
    //   if (this.info.cover) { this.cover = this.info.cover }
    // }
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    async gen() {
      //   const seed = await this.$crypt.genKey()
      //   const [sec, pub] = await this.$crypt.recKey(seed)
      //   this.$db.set('settings', 'seed', seed)
      //   this.$db.set('settings', 'sec', sec)
      //   this.$db.set('settings', 'pub', pub)
      //   this.$store.commit('setseed', seed)
      //   this.$store.commit('setsec', sec)
      //   this.$store.commit('setpub', pub)
    },
    // eslint-disable-next-line space-before-function-paren
    copySec() {
      // this.$copyText(this.seed).then((e) => {
      //   console.log(e)
      //   this.$notify({ text: 'Секретный ключ скопирован!', type: 'success' })
      // }, (e) => {
      //   console.log(e)
      //   this.$notify({ text: 'Не могу скопировать секретный ключ', type: 'warn' })
      // })
    },
    // eslint-disable-next-line space-before-function-paren
    copyPub() {
      // this.$copyText(this.pub).then((e) => {
      //   console.log(e)
      //   this.$notify({ text: 'Публичный ключ скопирован!', type: 'success' })
      // }, (e) => {
      //   console.log(e)
      //   this.$notify({ text: 'Не могу скопировать публичный ключ', type: 'warn' })
      // })
    },
    // eslint-disable-next-line space-before-function-paren
    i2b() {
      // const reader = new FileReader()
      // reader.readAsDataURL(this.file[0])
      // reader.onload = () => {
      //   this.cover = reader.result
      // }
    },
    // eslint-disable-next-line space-before-function-paren
    async send(q) {
      console.log(q)
      // try {
      //   const re = await ky.post(import.meta.env.VITE_REST_SERVER + 'user/', { json: q })
      //   if (!re.ok) {
      //     throw new Error(`Fetch error: ${re.statusText}`)
      //   } else {
      //     const response = await re.json()
      //     if (response.detail[0].success === 1) {
      //       this.$notify({ text: response.detail[0].msg, type: 'success' })
      //     } else {
      //       this.$notify({ text: response.detail[0].msg, type: 'warn' })
      //     }
      //   }
      // } catch (e) {
      //   console.error(e)
      // }
    },
    // eslint-disable-next-line space-before-function-paren
    async save() {
      // const q = {
      //   addr: this.pub,
      //   req: '',
      //   time: Date.now(),
      //   content: '',
      //   sign: ''
      // }
      // if (!this.name && !this.desc && !this.cover) {
      //   this.$notify({ text: 'Пусто!', type: 'warn' })
      // }
      // if (this.name) {
      //   q.req = 'name'
      //   q.content = this.name
      //   q.sign = this.$crypt.sign(this.name, this.sec)
      //   await this.send(q)
      // }
      // if (this.desc) {
      //   q.req = 'desc'
      //   q.content = this.desc
      //   q.sign = this.$crypt.sign(this.desc, this.sec)
      //   await this.send(q)
      // }
      // if (this.cover) {
      //   q.req = 'cover'
      //   q.content = this.cover
      //   q.sign = this.$crypt.sign(this.cover, this.sec)
      //   await this.send(q)
      // }
    }
  }
}
</script>
