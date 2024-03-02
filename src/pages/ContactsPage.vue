<template>
  <div justify="center" align="center" style="width: 100%; word-wrap: break-word; overflow: hidden;">
    <q-item class=" justify-center items-center q-ma-md">
      <q-item class="text-h6">{{ $t('titles.contacts') }}</q-item>
    </q-item>

    <q-card flat v-for="contact in contacts" :key="contact.id" style="background-color: #110030;" class="q-mb-sm">
      <q-card-section horizontal>
        <q-btn :label="contact.name" style="max-width: 80%; overflow: hidden; text-overflow: ellipsis" />
        <q-space />
        <q-btn @click="rm(contact.id)" icon="delete" />
      </q-card-section>
    </q-card>

    <q-btn class="q-ma-sm" icon="person_add" @click="plus" />
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const contacts = ref([
  {
    id: 1,
    name: 'Иван'
  }
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars, space-before-function-paren
function plus() {
  const name = prompt()
  if (name) {
    contacts.value.push({
      id: contacts.value[contacts.value.length - 1] + 1,
      name
    })
    $q.notify({
      type: 'positive',
      message: 'Создан новый контакт'
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, space-before-function-paren
function rm(id) {
  contacts.value = contacts.value.filter((contact) => contact.id !== id)
  $q.notify({
    type: 'negative',
    message: 'Контакт удален'
  })
}

</script>
