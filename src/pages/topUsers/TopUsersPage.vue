<script setup>
import { ref } from 'vue'
import UserItem from './UserItem.vue'

const userItems = ref([
  { id: 1, nickName: 'Тазик Дёгтя', publicKey: 'Ae2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://static10.tgstat.ru/channels/_0/95/9599d12ba8791240e7a691f31ace35a6.jpg', rank: '1' },
  { id: 2, nickName: 'Вупсень', publicKey: '1sTq5i5XTS3vvgTAe2tdPwUPEZ6mvNUZcfr9JnfUorEFgH77tJcYP9BX55L', avatar: 'https://sun9-61.userapi.com/impg/QSHPcb-Be_JXX7E09ckyZC1QaUI9SVrdV7do-g/pA2hg43JTZg.jpg?size=1276x1280&quality=95&sign=c1a77bfb1439d0715541b5f508567ad2&c_uniq_tag=r9oFUCQ2oNoAU9iza9izH2BlA1JK062VgFQcebhSy1A&type=album', rank: '2' },
  { id: 3, nickName: 'Пупсень', publicKey: '9JnfU1PEZ6TS3vvgTmvNUZcfrsTq5iAe2tdPwU5XorEFgH77tJcYP9BX55L', avatar: 'https://kartinkof.club/uploads/posts/2023-05/1683383915_kartinkof-club-p-vupsen-kartinki-27.jpg', rank: '3' },
  { id: 4, nickName: 'Переносной гриль', publicKey: 'wUPEZ6TS3vvgTmvNUZcfr9JnfAe2tdPU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663138463_42-mykaleidoscope-ru-p-veselii-samurai-krasivo-43.jpg', rank: '4' },
  { id: 5, nickName: 'Семен', publicKey: 'rEFgH77tJcYPAe2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5Xo9BX55L', avatar: 'https://img.goodfon.ru/original/2048x2048/6/c5/zak-efron-aktere-paren-foto.jpg', rank: '5' },
  { id: 6, nickName: 'Сторож Совести', publicKey: 'nf2tdPwUPEZ6TS3vvgTmvNUZcfr9JU1sTq5i5XorEFgH77tJcAeYP9BX55L', avatar: 'https://i.pinimg.com/736x/ba/33/ca/ba33caa17bcbae16ebb35514acf740bd.jpg', rank: '6' },
  { id: 7, nickName: 'Vika', publicKey: '3vvgTmvNUAe2tdPwUPEZ6TSZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://sun6-22.userapi.com/s/v1/if1/Kx0oxhQzfzd4-V1EiwtJIqbzg3r5IjfLnVnqkXOcbV02dLx9FlmKmxOiZaWhcEEJiCrttjZY.jpg?size=1600x1600&quality=96&crop=482,0,1600,1600&ava=1', rank: '7' }
])

</script>

<template>
  <q-item class=" justify-center items-center q-ma-md">
    <q-item class="text-h6">{{ $t('titles.topUsersTitle') }}</q-item>
  </q-item>
  <q-list>
    <q-item v-for="item in userItems" :id="item.id" :key="item.id" class="q-my-sm">
      <UserItem :user="item"/>
    </q-item>
  </q-list>
</template>
