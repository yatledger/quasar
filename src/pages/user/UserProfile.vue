<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'user name',
  nikname: 'nickname',
  address: 'TXfguX46BGYTqcLo8CNLRZaa58xyErsQRB'
})

const send = () => {
  return true
}
</script>

<template>
  <q-page class="container overflow-y-hidden shadow-10">
    <q-card class="column">
      <q-card-section>
        <div class="user-data">
          <q-avatar size="80px" class="shadow-10">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="left">
            <p class="name">{{ user.name }} <q-icon name="edit" class="hoverable" /></p>
            <p class="email">{{ user.nikname }} <q-icon name="edit" class="hoverable" /></p>
            <p class="address">{{ user.address }} <q-icon name="content_copy" class="hoverable" /></p>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="column">
        <div class="row">
          <q-btn color="primary" label="Login" @click="login" />
          <q-btn color="primary" label="Выход" @click="logout" />
        </div>
        <q-btn color="primary" label="Вход" @click="login">
          <q-icon name="login" />
        </q-btn>
        <q-btn color="primary" label="Выход" @click="logout" />
        <q-btn color="primary" label="Поддержка" @click="support" />
        <q-btn color="primary" label="Настройки" @click="settings" />
        <q-btn color="primary" label="Аккаунт секьюрити" @click="security" />
      </q-card-actions>
      <div class="q-mt-md q-mb-lg ma-auto column pa-10">
        <q-btn color="primary" size="lg" @click="send" label="Отправить" class="shadow-10" />
      </div>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
}

.user-data {
  display: flex;
  gap: 12px;
  background-color: $dark-page;
  padding: 26px;
  border-radius: 16px;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container {
  padding: 4px 60px;
  max-height: 100dvh;
}

.row {
  display: flex;
  gap: 20px;
}

.ma-auto {
  margin: 0 auto;
}

.name,
.email,
.address {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hoverable:hover {
  color: $accent;
}

.hoverable:active {
  color: $accent;
}
</style>

<!-- <template>
  <q-input label="Имя" placeholder="На балансе должно быть более 100ѣ" variant="underlined"></q-input>
  <q-input placeholder="Pick a cover" label="Добавьте обложку" hint="На балансе должно быть более 500ѣ"></q-input>
  <q-input type="textarea" label="Описание" no-resize
    hint="Для хранения описания держите на балансе более 250ѣ"></q-input>
  <div class="q-mt-md q-mb-lg"><q-btn color="primary" size="xl" @click="send" label="Отправить" /></div>
</template> -->
