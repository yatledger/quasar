<script setup>
const send = () => {
  return true
}
</script>

<template>
  <q-input label="Имя" placeholder="На балансе должно быть более 100ѣ" variant="underlined"></q-input>
  <q-input placeholder="Pick a cover" label="Добавьте обложку" hint="На балансе должно быть более 500ѣ"></q-input>
  <q-input type="textarea" label="Описание" no-resize
    hint="Для хранения описания держите на балансе более 250ѣ"></q-input>
  <div class="q-mt-md q-mb-lg"><q-btn color="primary" size="xl" @click="send" label="Отправить" /></div>
</template>
