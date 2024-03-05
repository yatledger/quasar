<template>
  <div justify="center" align="center" style="width: 100%; word-wrap: break-word; overflow: hidden;">
    <q-item class=" justify-center items-center q-ma-md">
      <q-item class="text-h6">{{ $t('titles.contacts') }}</q-item>
    </q-item>

    <q-btn-dropdown color="primary" rounded :label="$t('import')">
      <q-list class="q-mt-sm">
        <q-item>
          <q-item-section>
            <q-item-label class="row justify-center">
              <q-btn label="Скачать json-файл" @click="exportContacts" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-file filled v-model="model" @input="handleFileUpload" label="json файл">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn class="q-ma-sm" icon="person_add" @click="plus" />

    <q-card flat v-for="contact in contacts" :key="contact.id" style="background-color: #110030;" class="q-mb-sm">
      <q-card-section horizontal>
        <q-btn :label="contact.name" style="max-width: 80%; overflow: hidden; text-overflow: ellipsis" />
        <q-space />
        <q-btn @click="rm(contact.id)" icon="delete" />
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { contactStore } from '../stores/contact'

const contacts = ref([])
const url = ref('')
const $q = useQuasar()
const db = contactStore()

onMounted(async () => {
  await getContacts()
  url.value = await getUrl()
})

async function plus () {
  const name = prompt()
  const addr = prompt()
  if (name && addr) {
    await db.addContact(name, addr)
    await getContacts()
    url.value = await getUrl()
    $q.notify({
      type: 'positive',
      message: 'Создан новый контакт'
    })
  }
}

async function rm (id) {
  await db.deleteContact(id)
  await getContacts()
  url.value = await getUrl()

  $q.notify({
    type: 'negative',
    message: 'Контакт удален'
  })
}

async function getContacts () {
  contacts.value = await db.getContacts()
}

async function getUrl () {
  const exportContacts = await db.getContacts()
  const data = JSON.stringify(exportContacts)

  const file = new Blob([data], { type: 'application/json' })
  return URL.createObjectURL(file)
}

async function exportContacts () {
  const a = document.createElement('a')
  a.href = url.value
  a.download = 'contacts.json'
  document.body.appendChild(a)
  a.click()

  setTimeout(function () {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 0)
}

function handleFileUpload (event) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = async () => {
    const fileContent = reader.result
    console.log('Содержимое файла:', fileContent)

    await db.setContacts(JSON.parse(fileContent))
    await getContacts()
  }

  reader.onerror = () => {
    console.error('Ошибка при чтении файла')
  }

  if (file) {
    reader.readAsText(file)
  }
}

</script>
