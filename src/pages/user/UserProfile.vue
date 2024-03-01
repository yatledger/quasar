<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'YAT USER',
  email: 'YAT_USER@MAIL.COM'
})

const send = () => {
  return true
}
</script>

<template>
  <q-page class="column-container overflow-y-hidden">
    <q-card class="column">
      <q-card-section>
        <div class="column">
          <q-avatar size="80px" class="shadow-10">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="column">
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="column">
        <div class="row">
          <q-btn color="primary" label="Вход" @click="login" />
          <q-btn color="primary" label="Выход" @click="logout" />
        </div>
        <q-btn color="primary" label="Вход" @click="login" />
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

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.column-container {
  padding: 6px 60px;
  max-height: 100dvh;
}

.row {
  display: flex;
  gap: 20px;
}

.ma-auto {
  margin: 0 auto;
}
</style>

<!-- <template>
  <q-input label="Имя" placeholder="На балансе должно быть более 100ѣ" variant="underlined"></q-input>
  <q-input placeholder="Pick a cover" label="Добавьте обложку" hint="На балансе должно быть более 500ѣ"></q-input>
  <q-input type="textarea" label="Описание" no-resize
    hint="Для хранения описания держите на балансе более 250ѣ"></q-input>
  <div class="q-mt-md q-mb-lg"><q-btn color="primary" size="xl" @click="send" label="Отправить" /></div>
</template> -->
