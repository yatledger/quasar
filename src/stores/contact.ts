import { defineStore } from 'pinia'
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export const contactStore = defineStore('contact', () => {
  const vm = getCurrentInstance()
  const { $db } = (vm as ComponentInternalInstance).appContext.config.globalProperties

  async function getContacts () {
    return await $db.getContacts()
  }

  async function findContact (name:string) {
    return await $db.getContactsByName(name)
  }

  async function setContacts (contacts: { name: string, addr: string, id: number }[]) {
    const errors = []

    for (const contact of contacts) {
      const { name, addr } = contact
      const res = await addContact(name, addr)
      if (typeof res === 'string') errors.push(res)
    }

    return errors
  }

  async function addContact (name: string, addr: string) {
    const hasContact = await $db.hasContact(name, addr)
    if (hasContact) {
      return `Контакт ${name} с таким именем или адресом (${addr}) уже существует`
    }
    return await $db.addContact({ name, addr })
  }

  async function changeContact (contact:{ name: string, addr: string, id: number }) {
    console.log(contact)

    return await $db.set('contacts', contact)
  }

  async function deleteContact (id: number) {
    return await $db.deleteContact(id)
  }

  return { getContacts, addContact, deleteContact, setContacts, findContact, changeContact }
})
