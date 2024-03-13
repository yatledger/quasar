<template>
  <div justify="center" align="center" style="width: 100%; word-wrap: break-word; overflow: hidden;">
    <q-item class=" justify-center items-center q-ma-md">
      <q-item class="text-h6">{{ $t('titles.contacts') }}</q-item>
    </q-item>

    <q-btn-dropdown rounded :label="$t('import')">
      <q-list class="q-mt-sm">
        <q-item>
          <q-item-section>
            <q-item-label class="row justify-center">
              <q-btn :label="$t('dowloadJson')" @click="exportContacts" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-file filled v-model="model" @input="handleFileUpload" :label="$t('uploadJson')">
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

    <q-input filled :label="$t('placeholder')" label-color="white" @update:model-value="update" class="q-mt-md"
      style="width: 45%;" />

    <q-card class="q-mb-sm" flat v-for="(contact, i) in contacts" :key="contact.id" style="background-color: #110030">
      <q-card-section horizontal>
        <q-card-section class="row items-center">
          <img src="/avatars/Rectangle 30.svg" alt="">
        </q-card-section>
        <q-card-section class="column justify-center text-left">
          <p v-if="!isEdit[i]">{{ contact.name }}</p>
          <q-input filled label="Имя" v-model="contact.name" label-color="white" class="q-mt-md" v-else />
          <p>{{ contact.addr }}</p>
        </q-card-section>
        <q-space />
        <q-card-section>
          <div class="default" v-if="!isEdit[i]">
            <q-btn @click="edit(i)" icon="edit" />
            <q-btn @click="rm(contact.id)" icon="delete" />
          </div>
          <div class="btns" v-else>
            <q-btn @click="save(i)" icon="done" />
            <q-btn @click="edit(i)" icon="cancel" />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { contactStore } from '../stores/contact'

const $q = useQuasar()
const db = contactStore()

const contacts = ref([])
const url = ref('')
const isEdit = ref([])

async function update (value) {
  contacts.value = await db.findContact(value)
}

async function edit (index) {
  isEdit.value[index] = !isEdit.value[index]
}

async function save (index) {
  const edited = contacts.value[index]
  await db.changeContact(JSON.parse(JSON.stringify(edited)))
  // await getContacts()
  $q.notify({
    type: 'positive',
    message: 'Контакт обновлен'
  })
  edit()
}

async function getUrl () {
  const exportContacts = await db.getContacts()
  const data = JSON.stringify(exportContacts)

  const file = new Blob([data], { type: 'application/json' })
  return URL.createObjectURL(file)
}

async function plus () {
  const name = prompt()
  const addr = prompt()
  if (name && addr) {
    const res = await db.addContact(name, addr)
    if (res.length) {
      $q.notify({
        type: 'negative',
        message: res
      })
    } else {
      await getContacts()
      url.value = await getUrl()
      $q.notify({
        type: 'positive',
        message: 'Создан новый контакт'
      })
    }
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
  isEdit.value.length = contacts.value.length
  isEdit.value.fill(false)
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
    const err = await db.setContacts(JSON.parse(fileContent))
    if (err.length) {
      for (let i = 0; i < err.length; i++) {
        $q.notify({
          type: 'negative',
          message: err[i]
        })
      }
    }
    await getContacts()
  }

  reader.onerror = () => {
    console.error('Ошибка при чтении файла')
  }

  if (file) {
    reader.readAsText(file)
  }
}

onMounted(async () => {
  await getContacts()
  url.value = await getUrl()
})

</script>
