import { defineStore } from 'pinia'
import { getCurrentInstance } from 'vue'

export const contactStore = defineStore('contact', () => {
  const vm = getCurrentInstance()
  const { $db } = vm.appContext.config.globalProperties

  async function getContacts () {
    return await $db.getContacts()
  }

  async function setContacts (contacts: { name: string, addr: string, id: number }[]) {
    for (const contact of contacts) {
      const { name, addr } = contact
      await $db.addContact({ name, addr })
    }
  }

  async function addContact (name: string, addr: string) {
    return await $db.addContact({ name, addr })
  }

  async function deleteContact (id: number) {
    return await $db.deleteContact(id)
  }

  return { getContacts, addContact, deleteContact, setContacts }
})
