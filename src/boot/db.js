import { boot } from 'quasar/wrappers'
import { openDB } from 'idb'

export default boot(({ app }) => {
  const _db = openDB('yat', 1, {
    // eslint-disable-next-line space-before-function-paren
    upgrade(db) {
      db.createObjectStore('settings')
      const contacts = db.createObjectStore('contacts', {
        keyPath: 'id',
        autoIncrement: true
      })
      contacts.createIndex('name', 'name')
    }
  })

  const db = {
    // eslint-disable-next-line space-before-function-paren
    async get(store, key) {
      return (await _db).get(store, key)
    },
    // eslint-disable-next-line space-before-function-paren
    async set(store, key, val) {
      return (await _db).put(store, val, key)
    },
    // eslint-disable-next-line space-before-function-paren
    async delete(store, key) {
      return (await _db).delete(store, key)
    },
    // eslint-disable-next-line space-before-function-paren
    async clear(store) {
      return (await _db).clear(store)
    },
    // eslint-disable-next-line space-before-function-paren
    async keys(store) {
      return (await _db).getAllKeys(store)
    },
    // eslint-disable-next-line space-before-function-paren
    async addContact(name, addr) {
      return (await _db).add('contacts', {
        name,
        addr
      })
    },
    // eslint-disable-next-line space-before-function-paren
    async getContacts() {
      return (await _db).getAllFromIndex('contacts', 'name')
    }
  }

  app.config.globalProperties.$db = db
})
