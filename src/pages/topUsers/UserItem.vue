<script setup>
import { defineProps } from 'vue'

defineProps({
  user: Object
})

const getBadgeColor = (value) => value < 4 ? 'yellow-7' : 'teal-7'

const getBadgeClasses = (value) => (
  value < 4
    ? 'text-weight-bold text-grey-10'
    : 'text-weight-bold text-white'
)

</script>

<template>
  <q-item class="full-width col justify-start items-start content-center">
    <q-item-section side>
      <q-avatar size="70px">
        <q-img :src="user.avatar" style="max-width: 100%;" />
        <q-badge :align="bottom" rounded floating :color="getBadgeColor(user.rank)" :class="getBadgeClasses(user.rank)">
          <q-icon name="emoji_events" />
          {{ user.rank }}
        </q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-grow">
      <q-item-section style="max-width: 200px;">
        <q-item-label class="text-weight-bold" style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 10px;
          ">
          {{ user.nickName }}
        </q-item-label>
        <q-item-label caption style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 10px;
          ">
          {{ user.publicKey }}
        </q-item-label>
      </q-item-section>
    </q-item-section>
    <q-fab class="self-center" color="primary" text-color="white" icon="more_vert" direction="left">
      <q-fab-action color="primary" text-color="white" @click="onClick" icon="forum" />
      <q-fab-action color="primary" text-color="white" @click="onClick" icon="person_add_alt" />
      <q-fab-action class="yat-icon" color="primary" text-color="white" @click="onClick" icon="currency_ruble" />
    </q-fab>
  </q-item>
</template>

<style scoped>
.yat-icon {
  transform: scaleY(-1);
}
</style>
