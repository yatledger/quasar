<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from 'stores/user'
import db from 'boot/db'
import EssentialLink from 'components/EssentialLink.vue'
const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const user = userStore()
onMounted(async () => {
  const seed = await db.get('settings', 'seed')
  if (seed !== undefined || typeof seed !== 'undefined') {
    user.seed = seed
  }
})

const exit = () => {
  db.delete('settings', 'seed')
  user.$reset()
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>{{ $t('title') }}</q-toolbar-title>

        <q-btn icon="login" v-if="!user.sk" to="enter" color="secondary"></q-btn>
        <q-btn icon="logout" class="q-ml-sm" v-if="user.seed" @click="exit" color="secondary"></q-btn>
        <q-select class="q-ml-sm" v-model="$i18n.locale" :options=$i18n.availableLocales />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
