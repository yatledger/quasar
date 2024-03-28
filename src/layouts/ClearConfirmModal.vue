<script setup>
defineProps({
  handleConfirm: Function
})
</script>

<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="error" size="md" color="negative" text-color="white" />
        <span class="q-ml-sm text-h6">
          {{ $t('confirmMessages.clearDevice.clearQuestion') }}
        </span>
      </q-card-section>

      <q-card-section>
        {{ $t('confirmMessages.clearDevice.info') }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="$t('buttons.cancel')" color="primary" v-close-popup />
        <q-btn @click="handleConfirm" :label="$t('buttons.confirm')" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
