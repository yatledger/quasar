<template>
  <q-item class=" justify-center items-center q-ma-md">
    <q-item class="text-h6">{{ $t('titles.topUsersTitle') }}</q-item>
  </q-item>
  <q-list>
    <q-item v-for="item in userItems" :id="item.id" :key="item.id" class="q-my-sm">
      <q-item clickable v-ripple class="full-width col justify-start items-start content-center">
        <q-item-section side>
          <q-avatar rounded size="48px">
            <q-img :src="item.avatar" style="max-width: 100%;" />
            <q-badge floating :color="getBadgeColor(item.rank)" :class="getBadgeClasses(item.rank)">
              <q-icon name="emoji_events" />
              {{ item.rank }}
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
            ">
            {{ item.nickName }}
          </q-item-label>
            <q-item-label caption
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-right: 10px;
            "
            >{{ item.publicKey }}</q-item-label>
          </q-item-section>
        </q-item-section>
        <q-item-section side class="col-2 self-center text-right">
          <q-item-section avatar><q-icon name="arrow_forward_ios" /></q-item-section>
        </q-item-section>
      </q-item>
    </q-item>
  </q-list>
</template>

<script>
const userItems = [
  { id: 1, nickName: 'Тазик Дёгтя', publicKey: 'Ae2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://s3-alpha-sig.figma.com/img/caed/fd35/f35e2d51acb83d492cdd6f833093392c?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cDGXOuLvb~4vM7tlVVrDmvuZgIZo0~h~3pTs5StFrGIUHFDm84vKoWmwHnIj-oEPV-G~5limhTT83kDNHbpTQLSoiIoAt91n1KvwkS2z~6TIj5gMH4xwhr5BewyzDB2E2A1IogAFSE2q1x2AYk-VpcthIZWlKL9E-ZlLm71zIFTKaQJhxIl~5bMtC5h8eFlXn3eb6PDxjtv~p6s61N5dMWmuTAiX27ZXRlwnm6MWJZRmE7Evvm3Fe21kPSIvpjsR2BXUM3C3i8lXN6jOyjxTkoBPnA~8zzOFMoSRZEq89ObVKNCuQlxcPUw8sF~MifCpVMo8fwiRs4BviqxYFoSk~A__', rank: '1' },
  { id: 2, nickName: 'Вупсень', publicKey: '1sTq5i5XTS3vvgTAe2tdPwUPEZ6mvNUZcfr9JnfUorEFgH77tJcYP9BX55L', avatar: 'https://sun9-61.userapi.com/impg/QSHPcb-Be_JXX7E09ckyZC1QaUI9SVrdV7do-g/pA2hg43JTZg.jpg?size=1276x1280&quality=95&sign=c1a77bfb1439d0715541b5f508567ad2&c_uniq_tag=r9oFUCQ2oNoAU9iza9izH2BlA1JK062VgFQcebhSy1A&type=album', rank: '2' },
  { id: 3, nickName: 'Пупсень', publicKey: '9JnfU1PEZ6TS3vvgTmvNUZcfrsTq5iAe2tdPwU5XorEFgH77tJcYP9BX55L', avatar: 'https://kartinkof.club/uploads/posts/2023-05/1683383915_kartinkof-club-p-vupsen-kartinki-27.jpg', rank: '3' },
  { id: 4, nickName: 'Лосяш', publicKey: 'wUPEZ6TS3vvgTmvNUZcfr9JnfAe2tdPU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663581799_60-mykaleidoscope-ru-p-zloi-losyash-instagram-64.png', rank: '4' },
  { id: 5, nickName: 'Карыч', publicKey: 'rEFgH77tJcYPAe2tdPwUPEZ6TS3vvgTmvNUZcfr9JnfU1sTq5i5Xo9BX55L', avatar: 'https://yt3.googleusercontent.com/2WNrctNMRFcRFd_8vQSqyuBVDwQuLgwLwq9VM-62ChxQi6Cp6YMAY6w1VidFyuwoMfuKEW7b=s900-c-k-c0x00ffffff-no-rj', rank: '5' },
  { id: 6, nickName: 'Сторож Совести', publicKey: 'nf2tdPwUPEZ6TS3vvgTmvNUZcfr9JU1sTq5i5XorEFgH77tJcAeYP9BX55L', avatar: 'https://s3-alpha-sig.figma.com/img/7a07/a920/115748a2208f913bb0e1847aa9b9daf8?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EIxl9YQW6i11lZqKjRFbivwRtMlLAFR0rq1cGjDaLMQ2IMjDnxcJWfZqYWErmwWITQfTM2MD8NgRmGrgWMfiWcXU50PXaoqArPKxtoML~JqF9c4ZHobq9K~Dkt9gfnt9aZ64IfT-v1O3lJ36YHTH82wbBt0C~6iaoCT4CLccZwUwMFUOLOvy19ZPLA20zTQslFM620nEgBplo6vuA70dBfNtBCuSdFUdJiaEOabvda~Np2p1VBsCx4nf5J3v4GF2fCIzeJC4WwWHcw8d-V6f1BVzf1VZh46rTq4MkE80S23TgnVWH1YfLuE5gHL0XDtzqd4ADr~C32juUPjxAy~0hg__', rank: '6' },
  { id: 7, nickName: 'Vika', publicKey: '3vvgTmvNUAe2tdPwUPEZ6TSZcfr9JnfU1sTq5i5XorEFgH77tJcYP9BX55L', avatar: 'https://s3-alpha-sig.figma.com/img/31be/4e70/c81034cd57b4dcf8f41bebe70b816a49?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=egVtaBDb5XlkWppxqXpLIfM-ikdqdC5ajm9Xh9ApaB5XLIdBdkhnLnhASoAv0PD6kZzppDt1YUB-KII6oYbPjen6E6elmaXBFDfDDzfoZ~Em5vgHFS~75k1GFXpGsnStD9aY77I0NCPzfrfVxxdspWmB6d-WMazKA9mqI1i-UordY8kSrtRts5j8vR3yUF-KQc4tKFNv-6Sys1nwiO0XoVKTB6W-XfrH9qPqtqyLt1L93PTAZiCVblYvsGQXP5cntW1ANHxl7A93ryq3ZuMrr-tPiBOcXQQ2fOYSGCTVyYuQvHQW3QIn-bs9JypZqfVkDa8bnf80IZcjxTK5JwA31A__', rank: '7' }
]

export default {
  data () {
    return {
      userItems
    }
  },
  methods: {
    getBadgeColor (value) {
      if (value < 4) return 'yellow-7'
      return 'teal-7'
    },
    getBadgeClasses (value) {
      if (value < 4) return 'text-weight-bold text-grey-10'
      return 'text-weight-bold text-white'
    }
  }
}
</script>
