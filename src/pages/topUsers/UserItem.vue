<script setup >
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
  <q-item clickable v-ripple class="full-width col justify-start items-start content-center">
    <q-item-section side>
      <q-avatar rounded size="48px">
        <q-img :src="user.avatar" style="max-width: 100%;" />
        <q-badge floating :color="getBadgeColor(user.rank)" :class="getBadgeClasses(user.rank)">
          <q-icon name="emoji_events" />
          {{ user.rank }}
        </q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section class="col-grow">
      <q-item-section style="max-width: 200px;">
        <q-item-label
          class="text-weight-bold"
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 10px;
          "
        >
          {{ user.nickName }}
        </q-item-label>
        <q-item-label
          caption
          style="
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 10px;
          "
        >
        {{ user.publicKey }}
      </q-item-label>
      </q-item-section>
    </q-item-section>
    <q-item-section side class="col-2 self-center text-right" style="margin-right: -20px;">
      <q-item-section avatar><q-icon name="arrow_forward_ios" class="q-pr-none"/></q-item-section>
    </q-item-section>
  </q-item>
</template>
