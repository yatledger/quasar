<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from 'stores/user'
import { sign, secretbox } from 'tweetnacl'
import russian from 'boot/wordlists/russian.json'
import uzbek from 'boot/wordlists/uzbek.json'
import { wordlist as english } from '@scure/bip39/wordlists/english'
import { wordlist as chinese } from '@scure/bip39/wordlists/simplified-chinese'
import { db } from 'boot/db'
import { generateMnemonic } from '@scure/bip39'
import { pbkdf2 } from '@noble/hashes/pbkdf2'
import { sha512 } from '@noble/hashes/sha512'
import { base58 } from '@scure/base'
import { passwordStrength } from 'check-password-strength'
import { useI18n } from 'vue-i18n'
import { Notify, copyToClipboard } from 'quasar'

const { t, locale } = useI18n()
console.log(db)
const user = userStore()
const router = useRouter()
console.log(user)

const pwdOptions = [
  {
    id: 0,
    value: t('sign.pwd0'),
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: t('sign.pwd1'),
    minDiversity: 1,
    minLength: 7
  },
  {
    id: 2,
    value: t('sign.pwd2'),
    minDiversity: 2,
    minLength: 7
  },
  {
    id: 3,
    value: t('sign.pwd3'),
    minDiversity: 3,
    minLength: 7
  },
  {
    id: 4,
    value: t('sign.pwd4'),
    minDiversity: 4,
    minLength: 8
  }
]

const pwd = ref('')
const pwdRef = ref(null)
const pk = ref('')
const isPwd = ref(true)
const isCopedSeed = ref(false)
const isCopedPwd = ref(false)
const mn = ref('')
let seed = ''
let keys = ''

const gen = (l) => {
  let wordlist
  // const wordlist = l === 'ru' ? russian : english
  switch (l) {
    case 'ru':
      wordlist = russian
      break
    case 'cn':
      wordlist = chinese
      break
    case 'uz':
      wordlist = uzbek
      break
    default:
      wordlist = english
  }
  console.log(wordlist)
  mn.value = generateMnemonic(wordlist).normalize('NFKD')
  seed = pbkdf2(sha512, mn.value, '', { c: 2048, dkLen: 32 })
  keys = sign.keyPair.fromSeed(seed)
  pk.value = base58.encode(keys.publicKey)
}

const signup = async () => {
  pwdRef.value.validate()
  if (pwdRef.value.hasError) {
    return
  }
  const encoder = new TextEncoder()
  const k = pbkdf2(sha512, pwd.value, '', { c: 2048, dkLen: 32 })
  const seed = base58.encode(secretbox(encoder.encode(mn.value), new Uint8Array(24), k))
  db.set('settings', 'seed', seed)
  user.sk = keys.secretKey
  user.pk = pk.value
  console.log(pk.value)
  user.crypt = seed
  user.seed = mn.value
  router.push('/profile')
}

gen(locale.value)
watch(ref(locale), () => gen(locale.value))

const hint = computed(() => pwd.value ? passwordStrength(pwd.value, pwdOptions).value : false)

const disabled = computed(() => pwd.value.length < 7)

const copySign = (txt) => {
  copyToClipboard(txt)
    .then(() => {
      isCopedSeed.value = true
      isCopedPwd.value = false
      Notify.create(t('sign.copy'))
    })
    .catch(() => {
      // fail
    })
}
const copyPwd = (txt) => {
  copyToClipboard(txt)
    .then(() => {
      isCopedPwd.value = true
      isCopedSeed.value = false
      Notify.create(t('sign.pwd'))
    })
    .catch(() => {
      // fail
    })
}

</script>

<style>
.public-key {
  overflow-wrap: anywhere;
}
</style>

<template>
  <q-page class="flex flex-center">
    <div class="col-auto q-pa-sm text-center" v-if="!user.seed">
      <p class="text-justify text-body1">{{ $t("sign.t1") }}</p>
      <!--TODO: copy-->
      <p><q-card class="text-h4" @click="copySign(mn)"><q-card-section>{{ mn }}
            <q-icon :name="!isCopedSeed ? 'content_copy' : 'done'" class="cursor-pointer" />
          </q-card-section></q-card></p>
      <p class="text-justify text-body1">{{ $t("sign.t2") }}:</p>
      <p>
        <q-card class="inline-block q-pa-xs text-h4 public-key" @click="copyPwd(pk)">{{ pk }}
          <q-icon :name="!isCopedPwd ? 'content_copy' : 'done'" class="cursor-pointer" />
        </q-card>
      </p>
      <p class="text-left text-body1">{{ $t("sign.t3") }}</p>
      <q-input ref="pwdRef" v-model="pwd" filled counter :type="isPwd ? 'password' : 'text'"
        :placeholder="$t('characters')" :hint="hint ? hint : $t('sign.protect')" :label="$t('password')" lazy-rules
        :rules="[
      val => !!val || $t('sign.pwdMust'),
      val => val.length > 6 || $t('sign.pwdMore'),
    ]">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <div class="q-mt-md"><q-btn push :disable="disabled" color="primary" size="xl" @click="signup"
          :label="$t('next')" />
      </div>
      <p class="text-subtitle1 q-mt-sm"><router-link to="remember">{{ $t("sign.know") }}</router-link></p>
    </div>
  </q-page>
</template>
