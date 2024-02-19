<script setup>
// import signin from 'components/SignIn.vue'
// import { ref } from 'vue'
// import { userStore } from 'stores/user'
// import db from 'boot/db'
// import { useQuasar } from 'quasar'

// const $q = useQuasar()
// const dark = ref($q.dark.isActive)
// const darkToggle = () => {
//   $q.dark.toggle()
// }

// const leftDrawerOpen = ref(false)
// const enter = ref(false)

// const user = userStore()

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

// const exit = () => {
//   user.pk = ''
//   user.sk = ''
//   user.seed = ''
// }

// const clear = () => {
//   db.delete('settings', 'seed')
//   user.$reset()
// }
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="text-white">
        <q-btn flat round dense icon="home" to="/" />
        <q-toolbar-title>
          <span class="title">Ятѣ.<span class="font-weight-light">Kошелёк</span></span>
        </q-toolbar-title>
        <q-btn flat round dense icon="help" />
      </q-toolbar>
    </q-header>
    <q-page-container class="row justify-center items-center" fluid>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-toolbar class="flex flex-center">
        <q-btn size="lg" icon="account_box" to="/friends" flat></q-btn>
        <q-btn size="lg" icon="sync_alt" to="/tx" flat></q-btn>
        <q-btn size="lg" icon="qr_code_scanner" to="/qr" flat></q-btn>
        <q-btn size="lg" icon="language" to="/global" flat></q-btn>
        <q-btn size="lg" icon="manage_accounts" to="/profile" flat></q-btn>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
