import { boot } from 'quasar/wrappers'
import { openDB } from 'idb'

export default boot(({ app }) => {
  const _db = openDB('yat', 1, {
    upgrade (db) {
      db.createObjectStore('settings')
      const contacts = db.createObjectStore('contacts', {
        keyPath: 'id',
        autoIncrement: true
      })
      contacts.createIndex('name', 'name')
    }
  })

  const db = {
    async get (store, key) {
      return (await _db).get(store, key)
    },
    async set (store, key, val) {
      return (await _db).put(store, val, key)
    },
    async delete (store, key) {
      return (await _db).delete(store, key)
    },
    async clear (store) {
      return (await _db).clear(store)
    },
    async keys (store) {
      return (await _db).getAllKeys(store)
    },
    async addContact (content) {
      return (await _db).add('contacts', content)
    },
    async setContacts (contacts) {
      const d = await _db
      for (let i = 0; i < contacts.length; i++) {
        await d.add('contacts', contacts[i])
      }
    },
    async getContacts () {
      return (await _db).getAllFromIndex('contacts', 'name')
    },
    async deleteContact (id) {
      return (await _db).delete('contacts', id)
    }
  }

  app.config.globalProperties.$db = db
})
