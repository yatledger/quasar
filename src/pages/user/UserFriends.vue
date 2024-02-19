<template>
  <div justify="center" align="center" style="width: 100%; word-wrap: break-word; overflow: hidden;">
    <h1>Контакты</h1>
    <div class="deb" v-for="contact in contacts" :key="contact.id">
      <q-btn :to="{ name: 'user', params: { id: contact.addr } }" variant="text"
        style="max-width: 80%; overflow: hidden; text-overflow: ellipsis" :label="contact.name"></q-btn>
      <q-btn @click="rm(contact.id)" icon="delete"></q-btn>
    </div>
    <q-btn @click="plus()" label="Добавить" icon-right="user"></q-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    contacts: [],
    name: '',
    addr: ''
  }),
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    this.contacts = await this.$db.getContacts()
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    async plus() {
      this.addr = prompt('Введите адрес')
      this.name = prompt('Введите имя')

      if (await this.$db.addContact(this.name, this.addr)) {
        this.$q.notify({
          message: 'Добавлен!',
          position: 'top'
        })
        this.contacts = await this.$db.getContacts()
      }
    },
    // eslint-disable-next-line space-before-function-paren
    async rm(i) {
      this.$db.delete('contacts', i)
      this.contacts = await this.$db.getContacts()
    }
  }
}
</script>
