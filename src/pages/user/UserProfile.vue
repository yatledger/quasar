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
    <div class="content">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="user-data shadow-21">
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
        <q-card-actions class="btn-block">
          <q-btn color="primary" class="btn-user" label="Поддержка" @click="support" />
          <q-btn color="primary" class="btn-user shadow-21" @click="send" label="Отправить" />
          <q-btn color="primary" class="btn-user" label="Настройки" @click="settings" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 4px 60px;
  max-height: 100dvh;

  .content {
    display: flex;
  }

  .btn-block {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 14px 0;

    .btn-user {
      max-width: 112px;
      width: 100%;
    }
  }
}

.user-data {
  display: flex;
  gap: 12px;
  background-color: $primary;
  padding: 26px;
  border-radius: 8px;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
