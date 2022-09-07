import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
  const sk = ref(null)
  const pk = ref('')
  const seed = ref(null)
  return { sk, pk, seed }
})
