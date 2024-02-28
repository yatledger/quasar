<script setup>
import { ref } from 'vue'

const numberValue = ref(0)
const selectValue = ref('Amount of BNB')
const options = ['Amount of BNB', 'Facebook', 'Twitter', 'Apple', 'Oracle']
</script>

<template>
  <div class="wrapper">
    <div class="select">
      <q-select v-model="selectValue" borderless style="width: 75%" :options="options" label-color="grey-8" />
      <q-input v-model="numberValue" mask="######"  bg-color="grey-6" standout>
        <template v-slot:append>
          <img src="/icons/updown-arrow-icon.png" alt="">
        </template>
      </q-input>
      <p class="gray q-mt-sm">$324.145</p>
    </div>
    <q-btn color="primary">Next</q-btn>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  height: calc(100vh - 56px);
}

.select img {
  width: 25px;
  height: 25px;
}

.select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.gray {
  color: #7B7B7B;
}
</style>
