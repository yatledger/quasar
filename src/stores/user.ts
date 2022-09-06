import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
  const sk = ref('')
  const pk = ref('')
  return { sk, pk }
})
