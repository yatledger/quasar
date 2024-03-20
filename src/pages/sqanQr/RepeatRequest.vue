<script setup>
import { defineProps } from 'vue'

defineProps({
  clickHandle: Function
})
</script>

<template>
  <div class="row q-pa-md q-flex justify-around items-center" style="max-width: 90%; margin: 0 auto;">
    <q-chip size="md">
      <q-avatar icon="priority_high" color="red" text-color="white" />
      доступ к камере не разрешен
    </q-chip>
    <q-btn round size="lg" @click="clickHandle" color="primary" text-color="white" icon="photo_camera" />
  </div>
</template>
