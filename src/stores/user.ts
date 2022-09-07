import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import db from 'boot/db'

export const userStore = defineStore('user', () => {
  const crypt = ref(null)
  onMounted(async () => {
    const seed = await db.get('settings', 'seed')
    if (seed !== undefined || typeof seed !== 'undefined') {
      crypt.value = seed
    }
  })
  const sk = ref(null)
  const pk = ref('')
  const seed = ref(null)

  return { sk, pk, seed, crypt }
})
