<script setup>
defineProps({
  errMessage: Object
})

</script>

<template>
  <q-dialog backdrop-filter="blur(4px)">
    <q-card>
      <q-toolbar>
        <q-icon size="md" color="negative" name="error" />

        <q-toolbar-title class="text-weight-bold">

        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section class="text-center text-weight-bold">
        {{ errMessage.header }}
      </q-card-section>

      <q-card-section>
        {{ errMessage.text }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
