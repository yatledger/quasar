<script setup>
import signin from 'components/SignIn.vue'
import { ref } from 'vue'
import { userStore } from 'stores/user'

const user = userStore()
const enter = ref(true)
</script>

<template>
  <q-dialog style="opacity: 0.75" v-if="user.crypt && user.sk.length === 0" v-model="enter">
    <signin />
  </q-dialog>
  <q-page class="flex flex-center">
    <img
      :alt="$t('title')"
      src="~assets/logo.svg"
      style="width: 100%; height: auto"
    >
  </q-page>
</template>
