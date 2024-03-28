<script setup>
defineProps({
  fromValue: Object,
  toValue: Object,
  cancelClick: Function,
  confirmClick: Function,
  transactionDemo: Function,
  transactionDate: Function
})
</script>
<template>
  <q-dialog persistent backdrop-filter="blur(4px)">
    <q-card style="max-width: 100%;">
      <p style="text-align: center; margin: 10px;">DEMO TRANSACTION</p>
      <q-card-section class="row items-center">
        <q-section class="q-pa-sm">
          <q-timeline color="secondary">
            <q-timeline-entry :subtitle="fromValue.nickName" :avatar="fromValue.avatar" />
            <q-timeline-entry :title="transactionDemo()" :subtitle="transactionDate()" icon="south" />
            <q-timeline-entry :subtitle="toValue.nickName" :avatar="toValue.avatar" />
          </q-timeline>
        </q-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="cancelClick" :label="$t('cancel')" color="negative" v-close-popup style="margin-right: 30px;" />
        <q-btn @click="confirmClick" flat :label="$t('send')" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
