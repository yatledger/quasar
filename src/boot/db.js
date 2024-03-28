import { boot } from 'quasar/wrappers'
import { openDB } from 'idb'

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

export const db = {
  async hasContact (name, addr) {
    let cursor = await (await _db).transaction('contacts').store.openCursor()

    while (cursor) {
      if (cursor.value.name === name || cursor.value.addr === addr) return true

      cursor = await cursor.continue()
    }

    return false
  },
  async getContactsByName (name) {
    let cursor = await (await _db).transaction('contacts').store.openCursor()

    const res = []
    while (cursor) {
      if (cursor.value.name.includes(name)) {
        res.push(cursor.value)
      }

      cursor = await cursor.continue()
    }

    return res
  },

  async get (store, key) {
    return (await _db).get(store, key)
  },
  async set (store, val) {
    return (await _db).put(store, val)
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
  async getContacts () {
    return (await _db).getAllFromIndex('contacts', 'name')
  },
  async deleteContact (id) {
    return (await _db).delete('contacts', id)
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$db = db
})
