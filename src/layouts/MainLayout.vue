<script setup>
import signin from 'components/SignIn.vue'
import { ref } from 'vue'
import { userStore } from 'stores/user'
import db from 'boot/db'

const leftDrawerOpen = ref(false)
const enter = ref(false)

const user = userStore()

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const exit = () => {
  user.$reset()
}

const clear = () => {
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

        <q-btn icon="login" v-if="user.crypt && !user.sk"  @click="enter = true" color="secondary"></q-btn>
        <q-btn icon="logout" class="q-ml-sm" v-if="user.sk" @click="exit" color="secondary"></q-btn>
        <!--TODO: locale in db-->
        <q-select class="q-ml-sm" v-model="$i18n.locale" :options=$i18n.availableLocales />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>{{ $t('menu.title') }}:</q-item-label>
        <q-item clickable tag="a" to="/">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.home') }}</q-item-label>
            <q-item-label caption>{{ $t('menu.homeDesc') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-if="!user.crypt" clickable tag="a" to="/sign">
          <q-item-section avatar><q-icon name="perm_identity" /></q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.sign') }}</q-item-label>
            <q-item-label caption>{{ $t('menu.signDesc') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.crypt" @click="clear" clickable tag="span">
          <q-item-section avatar><q-icon name="delete" /></q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.clear') }}</q-item-label>
            <q-item-label caption>{{ $t('menu.clearDesc') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-dialog v-model="enter" persistent>
      <signin />
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
