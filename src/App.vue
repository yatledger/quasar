<script setup>
import { onMounted } from 'vue'
import { useClient } from 'villus'
import { userStore } from 'stores/user'
import db from './lib/db'

useClient({
  url: 'http://127.0.0.1:9696/graphql'
})

const user = userStore()
onMounted(async () => {
  const seed = await db.get('settings', 'seed')
  console.log(seed)

  user.sk = 'keys.secretKey'
  user.pk = 'pk.value'
})
</script>

<template>
  <router-view />
</template>
